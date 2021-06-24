'use strict'

import { Config } from '@supercharge/facades'
import { HttpContext } from '@supercharge/contracts'

export class ShowDocsController {
  /**
   * Handle the given request.
   */
  handle ({ response }: HttpContext): unknown {
    const version: string = Config.get('docs.default', 'main')

    return response.redirect().to(`/docs/${version}`)
  }
}
