'use strict'

import { HttpContext } from '@supercharge/contracts'

export class ShowPodcast {
  /**
   * Handle the given request.
   */
  handle ({ response }: HttpContext): unknown {
    return response.view('podcast', { title: 'A Supercharge Tale Podcast' })
  }
}
