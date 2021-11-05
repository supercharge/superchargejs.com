'use strict'

import Fs from '@supercharge/fs'
import { Application } from '@supercharge/contracts'
import { MarkdownRenderer } from '../modules/markdown/markdown-renderer'

export class Post {
  /**
   * The application instance.
   */
  private readonly app: Application

  private readonly content: string

  /**
   * Create a new documentation instance.
   */
  constructor (app: Application, content: string) {
    this.app = app
    this.content = content
  }

  static async loadFrom (path: string, app: Application): Promise<Post> {
    return new this(app, await Fs.content(path))
  }

  /**
   * Returns the rendered HTML string for the given markdown `file`.
   *
   * @param file
   *
   * @returns {String}
   */
  async createHtmlFromMarkdown (file: string): Promise<string> {
    return await this.markdownRenderer().render(
      await Fs.content(file)
    )
  }

  /**
   * Returns the markdown renderer instance.
   *
   * @returns {MarkdownRenderer}
   */
  markdownRenderer (): MarkdownRenderer {
    return this.app.make(MarkdownRenderer)
  }
}
