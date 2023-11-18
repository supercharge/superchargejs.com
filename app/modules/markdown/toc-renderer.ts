
import { Str } from '@supercharge/strings'
import { MarkedOptions, Renderer } from 'marked'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

interface Heading {
  level: HeadingLevel
  text: string
  slug: string
}

export class TableOfContentsRenderer extends Renderer {
  private readonly meta: {
    /**
     * Stores the headings.
     */
    headings: Heading[]
  }

  /**
   * Create a new renderer instance.
   */
  constructor (options?: MarkedOptions) {
    super(options)

    this.meta = { headings: [] }
  }

  /**
   * Returns the list of headings.
   */
  headings (): Heading[] {
    return this.meta.headings
  }

  /**
   * Returns the HTML for the given heading `text` and `level`.
   */
  override heading (text: string, level: HeadingLevel, _raw: string): string {
    if ([2, 3].includes(level)) {
      this.headings().push({ text, level, slug: Str(text).slug().get() })
    }

    return ''
  }
}
