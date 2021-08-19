'use strict'

import { DocsRenderer } from './docs-renderer'
import Markdown, { MarkedOptions } from 'marked'
import { Application } from '@supercharge/contracts'
import { getHighlighter, Highlighter, IShikiTheme, loadTheme } from 'shiki'

export class MarkdownRenderer {
  /**
   * The application instance.
   */
  private readonly app: Application

  /**
   * The Markdown renderer reference.
   */
  private readonly renderer: typeof Markdown

  /**
   * Create a new instance.
   */
  constructor (app: Application) {
    this.app = app
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
  async render (markdown: string, options?: MarkedOptions): Promise<string> {
    const highlighter = await getHighlighter({
      theme: await this.firefoxLightTheme(),
      langs: ['bash', 'sh', 'shell', 'css', 'html', 'javascript', 'js', 'json', 'typescript', 'handlebars', 'hbs', 'nginx', 'markdown'],
    })

    return new Promise((resolve, reject) => {
      this.renderer(markdown, this.rendererConfig(highlighter, options), (error, html) => {
        error
          ? reject(error)
          : resolve(html)
      })
    })
  }

  /**
   * Returns the Firefox Light theme for Shiki.
   *
   * @returns {IShikiTheme}
   */
  async firefoxLightTheme (): Promise<IShikiTheme> {
    return loadTheme(
      this.app.resourcePath('shiki-themes/firefox-light.json')
    )
  }

  /**
   * Returns the Night Owl Light theme for Shiki.
   *
   * @returns {IShikiTheme}
   */
  async nightOwlLightTheme (): Promise<IShikiTheme> {
    return loadTheme(
      this.app.resourcePath('shiki-themes/night-owl-light.json')
    )
  }

  /**
   * Returns the renderer configuration.
   *
   * @param {MarkedOptions} options
   *
   * @returns {MarkedOptions}
   */
  private rendererConfig (highlighter: Highlighter, options?: MarkedOptions): MarkedOptions {
    return { renderer: new DocsRenderer(highlighter, options) }
  }
}
