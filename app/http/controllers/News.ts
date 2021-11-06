'use strict'

import Fs from '@supercharge/fs'
import { Post } from '../../models/Post'
import Collect from '@supercharge/collections'
import { Controller } from '@supercharge/http'
import { HttpContext, HttpResponse } from '@supercharge/contracts'

export class ShowNews extends Controller {
  /**
   * Handle the given request.
   */
  async handle ({ response }: HttpContext): Promise<HttpResponse> {
    return response.view('news', {
      posts: await this.loadPosts()
    })
  }

  /**
   * Load all news posts.
   *
   * @returns {Post[]}
   */
  async loadPosts (): Promise<string[]> {
    return Collect(
      await Fs.allFiles(this.app.storagePath('posts'))
    ).map(async file => {
      return await Post.loadFrom(file, this.app)
    })
  }
}
