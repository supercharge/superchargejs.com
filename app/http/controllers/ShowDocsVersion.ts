
import { Str } from '@supercharge/strings'
import { Controller } from '@supercharge/http'
import { Documentation } from '../../models/documentation.js'
import { Application, HttpContext, HttpResponse } from '@supercharge/contracts'

export class ShowDocsVersion extends Controller {
  /**
   * The internal properties.
   */
  private readonly meta: {
    docs?: Documentation
  }

  /**
   * Create a new instance.
   */
  constructor (app: Application) {
    super(app)

    this.meta = {}
  }

  /**
   * Returns the documentation instance.
   */
  docs (): Documentation {
    if (this.meta.docs) {
      return this.meta.docs
    }

    throw new Error('Missing docs instance.')
  }

  /**
   * Handle the given request.
   */
  async handle ({ request, response }: HttpContext): Promise<any> {
    const page = request.params<{ page?: string }>().get('page', 'installation')
    const version = request.params<{ version: string }>().get('version')

    this.meta.docs = new Documentation(this.app, version)

    if (this.docs().isInvalidVersion()) {
      return this.redirectToDefaultVersion(response, page)
    }

    const content = await this.docs().get(page)

    if (!content) {
      return response.redirect().to('/404')
    }

    const title = `${Str(page).title().replaceAll('-', ' ').get() || 'Installation'} — Supercharge`

    return response.view('docs', {
      title,
      version,
      currentPage: page,
      docsContent: content,
      versions: this.docs().versions(),
      navigation: await this.docs().navigation(),
      currentVersion: this.docs().versions()[version],
    })
  }

  /**
   * Redirect to the docs default version.
   */
  private redirectToDefaultVersion (response: HttpResponse, page: string): any {
    return response.redirect().to(`/docs/${this.docs().defaultVersion()}/${page}`)
  }
}
