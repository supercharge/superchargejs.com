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
  async handle ({ request, response }: HttpContext): Promise<HttpResponse> {
    const posts = await this.loadPosts()

    return response.view('news', { posts })
  }

  async loadPosts (): Promise<Post[]> {
    return Collect(
      await Fs.allFiles(this.app.storagePath('posts'))
    ).map(async file => {
      return await Post.loadFrom(file, this.app)
    })
  }

  async render (posts: Post[]): Promise<string> {
    //
  }
}
