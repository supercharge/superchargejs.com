'use strict'

import { marked } from 'marked'
import { DocsPage } from './docs-page'
import { DocsRenderer } from './docs-renderer'
import { Application } from '@supercharge/contracts'
import { TableOfContentsRenderer } from './toc-renderer'
import { getHighlighter as getCodeBlockHighlighter, Highlighter, IShikiTheme, Lang, loadTheme } from 'shiki'

export class MarkdownRenderer {
  /**
   * The application instance.
   */
  private readonly app: Application

  /**
   * The Markdown renderer reference.
   */
  private readonly renderer: typeof marked

  /**
   * The code block highlighter reference.
   */
  private readonly meta: {
    renderConfig?: marked.MarkedOptions
    codeBlockHighlighter?: Highlighter
  }

  /**
   * Create a new instance.
   */
  constructor (app: Application) {
    this.app = app
    this.meta = {}
    this.renderer = marked
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
      this.app.resourcePath('shiki-themes/aura-dark.json')
      // this.app.resourcePath('shiki-themes/firefox-light.json')
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
      'ts',
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
   * @param {marked.MarkedOptions} options
   *
   * @returns {marked.MarkedOptions}
   */
  private rendererConfig (options?: marked.MarkedOptions): marked.MarkedOptions {
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
   * @param {marked.MarkedOptions} options
   *
   * @returns {String}
   */
  async render (markdown: string, options?: marked.MarkedOptions): Promise<string> {
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
   * @param {marked.MarkedOptions} options
   *
   * @returns {String}
   */
  async renderWithToc (markdown: string, options?: marked.MarkedOptions): Promise<string> {
    const toc = await this.tableOfContents(markdown, options)
    const { title, content } = await this.extractTitleAndContent(markdown, options)

    return `${title}\n ${toc}\n ${content}`
  }

  /**
   * Returns the rendered table of contents as HTML retrieved from the given `markdown` content.
   *
   * @param {String} markdown
   * @param {marked.MarkedOptions} options
   *
   * @returns {String}
   */
  async tableOfContents (markdown: string, options?: marked.MarkedOptions): Promise<string> {
    const headings = this.retrieveHeadingsFrom(markdown)
    const tocRenderer = new TableOfContentsRenderer(options)

    this.renderer.parser(headings, { renderer: tocRenderer })

    const toc = tocRenderer.headings().map(heading => {
      return heading.level === 2
        ? `- [${heading.text}](#${heading.slug})`
        : `  - [${heading.text}](#${heading.slug})`
    }).join('\n')

    return await this.render(toc, options)
  }

  /**
   * Returns only heading tokens from the given `markdown` content.
   *
   * @param markdown string
   *
   * @returns {Markdown.Token[]}
   */
  private retrieveHeadingsFrom (markdown: string): marked.Token[] {
    const tokens = this.renderer.lexer(markdown)

    return tokens.filter(token => {
      return token.type === 'heading'
    })
  }

  /**
   * Returns the page title from the given `markdown` content.
   *
   * @param {String} markdown
   *
   * @returns {String}
   */
  async extractTitleAndContent (markdown: string, options?: marked.MarkedOptions): Promise<{ title: string, content: string }> {
    const page = new DocsPage(markdown)

    return {
      title: await this.render(page.titleOr(''), options),
      content: await this.render(page.content(), options)
    }
  }
}
