'use strict'

import { DocsRenderer } from './docs-renderer'
import Markdown, { MarkedOptions } from 'marked'
import { Application } from '@supercharge/contracts'
import { getHighlighter as getCodeBlockHighlighter, Highlighter, IShikiTheme, Lang, loadTheme } from 'shiki'

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
    renderConfig?: MarkedOptions
    codeBlockHighlighter?: Highlighter
  }

  /**
   * Create a new instance.
   */
  constructor (app: Application) {
    this.app = app
    this.meta = {}
    this.renderer = Markdown
  }

  /**
   * Boot the markdown renderer.
   */
  async boot (): Promise<void> {
    this.meta.codeBlockHighlighter = await getCodeBlockHighlighter({
      theme: await this.loadTheme(),
      langs: this.supportedLanguages(),
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
   * Returns the list of supported languages.
   *
   * @returns {Lang[]}
   */
  supportedLanguages (): Lang[] {
    return [
      'bash',
      'css',
      'handlebars',
      'hbs',
      'html',
      'javascript',
      'js',
      'json',
      'markdown',
      'nginx',
      'sh',
      'shell',
      'typescript',
      'yaml'
    ]
  }

  /**
   * Returns the code highlighter instance.
   *
   * @returns {Highlighter}
   */
  codeBlockHighlighter (): Highlighter {
    if (!this.meta.codeBlockHighlighter) {
      throw new Error('Missing syntax/code-block highlighter instance')
    }

    return this.meta.codeBlockHighlighter
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
        renderer: new DocsRenderer(this.codeBlockHighlighter(), options)
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
