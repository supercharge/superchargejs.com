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
   * The code block highlighter reference.
   */
  private readonly meta: {
    codeHighlighter?: Highlighter
    renderConfig?: MarkedOptions
  }

  /**
   * Create a new instance.
   */
  constructor (app: Application) {
    this.app = app
    this.renderer = Markdown
    this.meta = {}
  }

  /**
   * Boot the markdown renderer.
   */
  async boot (): Promise<void> {
    this.meta.codeHighlighter = await getHighlighter({
      theme: await this.loadTheme(),
      langs: ['bash', 'sh', 'shell', 'css', 'html', 'javascript', 'js', 'json', 'typescript', 'handlebars', 'hbs', 'nginx', 'markdown'],
    })
  }

  /**
   * Returns a Shiki theme compatible file from disk.
   *
   * @returns {IShikiTheme}
   */
  async loadTheme (): Promise<IShikiTheme> {
    return loadTheme(
      this.app.resourcePath('shiki-themes/firefox-light.json')
      // this.app.resourcePath('shiki-themes/night-owl-light.json')
    )
  }

  /**
   * Returns the code highlighter instance.
   *
   * @returns {Highlighter}
   */
  codeHighlighter (): Highlighter {
    if (!this.meta.codeHighlighter) {
      throw new Error('Missing code highlighter instance')
    }

    return this.meta.codeHighlighter
  }

  /**
   * Returns the renderer configuration.
   *
   * @param {MarkedOptions} options
   *
   * @returns {MarkedOptions}
   */
  private rendererConfig (options?: MarkedOptions): MarkedOptions {
    if (!this.meta.renderConfig) {
      this.meta.renderConfig = {
        renderer: new DocsRenderer(this.codeHighlighter(), options)
      }
    }

    return this.meta.renderConfig
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
}
