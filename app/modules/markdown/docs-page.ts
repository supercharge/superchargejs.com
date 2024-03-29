
import { Str } from '@supercharge/strings'

export class DocsPage {
  /**
   * Stores the page’s markdown content.
   */
  private readonly markdown: string

  /**
   * Create a new renderer instance.
   */
  constructor (markdown: string) {
    this.markdown = markdown
  }

  /**
   * Returns the lines as an array.
   */
  lines (): string[] {
    return Str(this.markdown).lines()
  }

  /**
   * Returns the document’s title. Returns `undefined` if the document doesn’t have a title.
   */
  title (): string | undefined {
    return this.lines().find(line => {
      return line.length > 0
    })
  }

  /**
   * Returns the document’s title or the given `defaultValue`.
   */
  titleOr (defaultValue: string): string {
    return this.title() ?? defaultValue
  }

  /**
   * Returns the document’s content.
   */
  content (): string {
    return this.lines().filter(line => {
      return line !== this.title()
    }).join('\n')
  }
}
