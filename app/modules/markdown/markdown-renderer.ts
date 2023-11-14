
import { DocsPage } from './docs-page.js'
import { DocsRenderer } from './docs-renderer.js'
import { Application } from '@supercharge/contracts'
import { marked, MarkedOptions, Token } from 'marked'
import { TableOfContentsRenderer } from './toc-renderer.js'
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
    renderConfig?: MarkedOptions
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
   */
  async loadTheme (): Promise<IShikiTheme> {
    return loadTheme(
      this.app.resourcePath('shiki-themes/aura-dark.json')
      // this.app.resourcePath('shiki-themes/firefox-light.json')
    )
  }

  /**
   * Returns the list of supported languages.
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
   */
  codeBlockHighlighter (): Highlighter {
    if (!this.meta.codeBlockHighlighter) {
      throw new Error('Missing syntax/code-block highlighter instance')
    }

    return this.meta.codeBlockHighlighter
  }

  /**
   * Returns the renderer configuration.
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
   */
  async render (markdown: string, options?: MarkedOptions): Promise<string> {
    return await this.renderer(markdown, this.rendererConfig(options))
  }

  /**
   * Returns the rendered HTML of the given `markdown` content.
   */
  async renderWithToc (markdown: string, options?: MarkedOptions): Promise<string> {
    const toc = await this.tableOfContents(markdown, options)
    const { title, content } = await this.extractTitleAndContent(markdown, options)

    return `${title}\n ${toc}\n ${content}`
  }

  /**
   * Returns the rendered table of contents as HTML retrieved from the given `markdown` content.
   */
  async tableOfContents (markdown: string, options?: MarkedOptions): Promise<string> {
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
   */
  private retrieveHeadingsFrom (markdown: string): Token[] {
    const tokens = this.renderer.lexer(markdown)

    return tokens.filter(token => {
      return token.type === 'heading'
    })
  }

  /**
   * Returns the page title from the given `markdown` content.
   */
  async extractTitleAndContent (markdown: string, options?: MarkedOptions): Promise<{ title: string, content: string }> {
    const page = new DocsPage(markdown)

    return {
      title: await this.render(page.titleOr(''), options),
      content: await this.render(page.content(), options)
    }
  }
}
