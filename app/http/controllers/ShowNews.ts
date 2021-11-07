'use strict'

import Fs from '@supercharge/fs'
import { Post } from '../../models/post'
import Collect from '@supercharge/collections'
import { Controller } from '@supercharge/http'
import { HttpContext, HttpResponse } from '@supercharge/contracts'

export class ShowNews extends Controller {
  /**
   * Handle the given request.
   */
  async handle ({ response }: HttpContext): Promise<HttpResponse> {
    return response.view('news', {
      posts: await this.publishedPosts()
    })
  }

  /**
   * Returns the list of published posts, ordered DESC by publishedAt date.
   *
   * @returns {Object[]}
   */
  async publishedPosts (): Promise<object[]> {
    const posts = await this.loadPosts()

    return posts.filter(post => {
      return post.isPublished()
    }).sort((a, b) => {
      return b.publishedAt().getTime() - a.publishedAt().getTime()
    }).map(post => {
      return post.toJSON()
    })
  }

  /**
   * Load all news posts.
   *
   * @returns {Post[]}
   */
  async loadPosts (): Promise<Post[]> {
    return await Collect(
      await Fs.allFiles(this.app.storagePath('posts'))
    ).map(async file => {
      return await Post.loadFrom(file, this.app)
    })
  }
}
