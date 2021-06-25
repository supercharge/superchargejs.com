'use strict'

import Str from '@supercharge/strings'
import { Documentation } from '../../models/documentation'
import { Application, HttpContext, HttpResponse } from '@supercharge/contracts'

export class ShowDocsVersion {
  /**
   * The application instance.
   */
  private readonly app: Application

  /**
   * The documentation instance.
   */
  private readonly meta: {
    docs?: Documentation
  }

  constructor (app: Application) {
    this.app = app
    this.meta = { }
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
    const { version, page = 'installation' }: { version: string, page: string} = request.params as any

    this.meta.docs = new Documentation(this.app, version)

    if (!this.docs().isValidVersion()) {
      return this.redirectToDefaultVersion(response, page)
    }

    const content = await this.docs().get(page)

    if (!content) {
      return response
        .status(404)
        .redirect().to('/404')
    }

    const title = `${Str(page).title().replaceAll('-', ' ').get() || 'Installation'} — Supercharge`

    return response.view('docs', {
      title,
      version,
      currentPage: page,
      docsContent: content,
      versions: this.docs().versions(),
      navigation: this.docs().navigation(),
      currentVersion: this.docs().versions()[version]
    })
  }

  /**
   * Redirect to the docs default version.
   *
   * @param response
   * @param page
   *
   * @returns
   */
  private redirectToDefaultVersion (response: HttpResponse, page: string): any {
    return response.redirect().to(`/docs/${this.docs().defaultVersion()}/${page}`)
  }
}
