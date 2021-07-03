'use strict'

import { HttpContext } from '@supercharge/contracts'

export class ShowStartpage {
  /**
   * Handle the given request.
   */
  handle ({ response }: HttpContext): unknown {
    return response.view('index', builder => {
      builder.layout('startpage')
    })
  }
}
