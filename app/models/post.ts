'use strict'

import Fs from '@supercharge/fs'
import FrontMatter from 'front-matter'
import { tap } from '@supercharge/goodies'
import { Application } from '@supercharge/contracts'
import { MarkdownRenderer } from '../modules/markdown/markdown-renderer'

export class Post {
  private readonly post: PostAttributes

  /**
   * Create a new documentation instance.
   */
  constructor () {
    this.post = { markdown: '' }
  }

  /**
   * Load a post from the given file `path`.
   *
   * @param path
   * @param app
   *
   * @returns {Post}
   */
  static async loadFrom (path: string, app: Application): Promise<Post> {
    return this.createFrom(
      await Fs.content(path), app
    )
  }

  /**
   * Renders.
   *
   * @returns {String}
   */
  static async createFrom (raw: string, app: Application): Promise<Post> {
    const parsed = FrontMatter<PostAttributes>(raw)

    return new this()
      .withMarkdownContent(parsed.body)
      .withAuthor(parsed.attributes.author)
      .withPublishedAt(parsed.attributes.publishedAt)
      .withHtml(
        await this.markdownRenderer(app).render(parsed.body)

      )
  }

  /**
   * Returns the markdown renderer instance.
   *
   * @returns {MarkdownRenderer}
   */
  static markdownRenderer (app: Application): MarkdownRenderer {
    return app.make(MarkdownRenderer)
  }

  withAuthor (author?: string): this {
    return tap(this, () => {
      this.post.author = author
    })
  }

  withPublishedAt (publishedAt?: string): this {
    return tap(this, () => {
      this.post.publishedAt = publishedAt
    })
  }

  withMarkdownContent (content: string): this {
    return tap(this, () => {
      this.post.markdown = content
    })
  }

  withHtml (html: string): this {
    return tap(this, () => {
      this.post.html = html
    })
  }

  toJSON (): object {
    return {
      author: this.post.author,
      publishedAt: this.post.publishedAt,
      content: this.post.html
    }
  }
}

interface PostAttributes {
  /**
   * The author name.
   */
  author?: string

  /**
   * The “published at” date
   */
  publishedAt?: string

  /**
   * The markdown content.
   */
  markdown: string

  /**
   * The rendered HTML of the content.
   */
  html?: string
}
