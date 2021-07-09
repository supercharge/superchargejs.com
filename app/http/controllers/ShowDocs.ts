'use strict'

import { Config } from '@supercharge/facades'
import { HttpContext, HttpRedirect } from '@supercharge/contracts'

export class ShowDocs {
  /**
   * Handle the given request.
   */
  handle ({ response }: HttpContext): HttpRedirect {
    const version = Config.get('docs.default', 'main') as string

    return response.redirect().to(`/docs/${version}`)
  }
}
