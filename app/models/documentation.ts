
import Fs from '@supercharge/fs'
import { Str } from '@supercharge/strings'
import { Application } from '@supercharge/contracts'
import { resolveDefaultImport } from '@supercharge/goodies'
import { MarkdownRenderer } from '../modules/markdown/markdown-renderer.js'

export class Documentation {
  private readonly app: Application
  private readonly version: string

  /**
   * Create a new documentation instance.
   */
  constructor (app: Application, version: string) {
    this.app = app
    this.version = version
  }

  /**
   * Returns the navigation.
   */
  async navigation (): Promise<string> {
    return await resolveDefaultImport(
      this.app.resourcePath(`docs/${this.version}/navigation.js`)
    )
  }

  /**
   * Returns the markdown renderer instance.
   */
  markdownRenderer (): MarkdownRenderer {
    return this.app.make(MarkdownRenderer.name)
  }

  /**
   * Returns the rendered HTML content for the given docs `page`.
   */
  async get (page: string): Promise<string> {
    try {
      return await this.readAndParseFile(`${page}.md`)
    } catch (error) {
      return ''
    }
  }

  /**
   * Returns the parsed and prepared HTML page for the given docs `file`.
   */
  async readAndParseFile (file: string): Promise<string> {
    return this.createHtmlFromMarkdown(
      await this.resolveDocsPathFor(file)
    )
  }

  /**
   * Returns the resolved file path to the given docs `file`. Throws an error
   * if the given docs page does not exist for the requested `file`.
   */
  private async resolveDocsPathFor (file: string): Promise<string> {
    const resourcePath = this.app.resourcePath(`docs/${this.version}/${file}`)

    if (await Fs.exists(resourcePath)) {
      return resourcePath
    }

    const packagePath = this.app.resourcePath(`docs/${this.version}/packages/${file}`)

    if (await Fs.exists(packagePath)) {
      return packagePath
    }

    throw new Error('The requested docs page is not available.')
  }

  /**
   * Returns the rendered HTML string for the given markdown `file`.
   */
  async createHtmlFromMarkdown (file: string): Promise<string> {
    const markdown = await this.markdownRenderer().renderWithToc(
      await Fs.content(file)
    )

    return this.replaceLinks(markdown)
  }

  /**
   * Replaces the {{version}} placeholders in the docs markdown files with the
   * actual version so that all links in the docs work nicely together.
   */
  replaceLinks (content: string): string {
    const pattern = encodeURIComponent('{{version}}')

    return Str(content).replaceAll(pattern, this.version).get()
  }

  /**
   * Determine whether the given version is valid.
   */
  isValidVersion (): boolean {
    return !!this.versions()[this.version]
  }

  /**
   * Determine whether the given version is not valid.
   */
  isInvalidVersion (): boolean {
    return !this.isValidVersion()
  }

  /**
   * Returns all configured docs version mappings. The mapping keys are the
   * folder names and the values represent the name that is shown in the web.
   */
  versions (): { [key: string]: string } {
    return this.app.config().get('docs.versions')
  }

  /**
   * Returns the configured default docs version.
   */
  defaultVersion (): string {
    return this.app.config().get('docs.default')
  }
}
