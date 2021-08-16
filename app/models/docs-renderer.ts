'use strict'

import { Highlighter } from 'shiki'
import Str from '@supercharge/strings'
import Marked, { MarkedOptions, Renderer } from 'marked'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

export class DocsRenderer extends Renderer {
  /**
   * Stores the shiki highlighter instance.
   */
  private readonly highlighter: Highlighter

  /**
   * Create a new renderer instance.
   */
  constructor (highlighter: Highlighter, options?: MarkedOptions) {
    super(options)

    this.highlighter = highlighter
  }

  /**
   * Returns the HTML for the given heading `text` and `level`.
   *
   * @param {String} text
   * @param {HeadingLevel} level
   *
   * @returns {String}
   */
  heading (text: string, level: HeadingLevel): string {
    if (level === 1) {
      return `<h1>${text}</h1>`
    }

    const slug = this.slugify(text)

    return `<h${level} class="flex items-center">
              <a href="#${slug}" name="${slug}" class="p-1 -ml-8 mr-2 hover:text-blue-800 hover:bg-blueGray-100 rounded">
                ${this.bookmarkIcon()}
              </a>
              ${text}
            </h${level}>`
  }

  /**
   * Returns the HTML for the given table `header` and `body`.
   *
   * @param header
   * @param body
   * @returns
   */
  table (header: string, body: string): string {
    return `<table class="table-auto">
        ${header}
        ${body}
      </table>`
  }

  /**
   * Returns the HTML for the given code block.
   *
   * @param {String} content
   * @param {String} language
   * @param {Boolean} escaped
   *
   * @returns {String}
   */
  code (content: string, language: string): string {
    if (this.isAlert(language)) {
      const html: string = Marked(content)

      return `<div class="alert alert-${language} rounded flex px-4 text-sm">
                <div class="flex-shrink-0">
                    <img src="/images/icons/alerts/${language}.svg" />
                </div>
                <div class="ml-4">${html}</div>
              </div>`
    }

    return this.highlighter.codeToHtml(content, language)
  }

  /**
   * Determine whether the given code `language` is an alert.
   *
   * @param {String} language
   *
   * @returns {Boolean}
   */
  private isAlert (language: string): boolean {
    return ['info', 'success', 'warning'].includes(language)
  }

  /**
   * Returns the SVG HTML of a bookmark icon.
   *
   * @returns {String}
   */
  private bookmarkIcon (): string {
    return `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16" height="16" viewBox="0 0 24 24"
        fill="none" stroke="currentColor"
        class="fill-current stroke-current"
        stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
        class="icon">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
      </svg>
    `
  }

  /**
   * Returns the slugified `input`.
   *
   * @param {String} input
   *
   * @returns  {String}
   */
  private slugify (input: string): string {
    return Str(input).slug().get()
  }
}
