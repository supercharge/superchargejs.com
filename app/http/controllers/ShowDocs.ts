
import { Controller } from '@supercharge/http'
import { HttpContext, HttpRedirect } from '@supercharge/contracts'

export class ShowDocs extends Controller {
  /**
   * Handle the given request.
   */
  handle ({ request, response }: HttpContext): HttpRedirect {
    const page = request.param('page')
    const version = this.app.config().get<string>('docs.default', 'main')

    return page
      ? response.redirect().to(`/docs/${version}/${page}`)
      : response.redirect().to(`/docs/${version}/installation`)
  }
}
