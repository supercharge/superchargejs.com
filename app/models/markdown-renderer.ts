'use strict'

import { DocsRenderer } from './docs-renderer'
import Markdown, { MarkedOptions } from 'marked'

export class MarkdownRenderer {
  /**
   * The Markdown renderer reference.
   */
  private readonly renderer: typeof Markdown

  /**
   * Create a new instance.
   */
  constructor () {
    this.renderer = Markdown
  }

  /**
   * Returns the rendered HTML of the given `markdown` content.
   *
   * @param {String} markdown
   * @param {MarkedOptions} options
   *
   * @returns {String}
   */
  static async render (markdown: string, options?: MarkedOptions): Promise<string> {
    return new this().render(markdown, options)
  }

  /**
   * Returns the rendered HTML of the given `markdown` content.
   *
   * @param {String} markdown
   * @param {MarkedOptions} options
   *
   * @returns {String}
   */
  async render (markdown: string, options?: MarkedOptions): Promise<string> {
    return new Promise((resolve, reject) => {
      this.renderer(markdown, this.rendererConfig(options), (error, html) => {
        error
          ? reject(error)
          : resolve(html)
      })
    })
  }

  /**
   * Returns the rendered HTML of the given `markdown` content.
   *
   * @param {String} markdown
   * @param {MarkedOptions} options
   *
   * @returns {String}
   */
  renderSync (markdown: string, options?: MarkedOptions): string {
    return this.renderer(markdown, this.rendererConfig(options))
  }

  /**
   * Returns the renderer configuration.
   *
   * @param {MarkedOptions} options
   *
   * @returns {MarkedOptions}
   */
  private rendererConfig (options?: MarkedOptions): MarkedOptions {
    return { renderer: new DocsRenderer(options) }
  }
}
