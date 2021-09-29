'use strict'

import { Config } from '@supercharge/facades'
import { Controller } from '@supercharge/http'
import { HttpContext, HttpRedirect } from '@supercharge/contracts'

export class ShowDocs extends Controller {
  /**
   * Handle the given request.
   */
  handle ({ request, response }: HttpContext): HttpRedirect {
    const { page }: { page?: string } = request.params as any
    const version = Config.get('docs.default', 'main') as string

    return page
      ? response.redirect().to(`/docs/${version}/${page}`)
      : response.redirect().to(`/docs/${version}/installation`)
  }
}
