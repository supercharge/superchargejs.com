'use strict'

import { Highlighter } from 'shiki'
import { marked, Renderer, Slugger } from 'marked'

type AlertTypes = 'success' | 'info' | 'warning'
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

export class DocsRenderer extends Renderer {
  /**
   * Stores the shiki highlighter instance.
   */
  private readonly highlighter: Highlighter

  /**
   * Create a new renderer instance.
   */
  constructor (highlighter: Highlighter, options?: marked.MarkedOptions) {
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
  override heading (text: string, level: HeadingLevel, _raw: string, slugger: Slugger): string {
    if (level === 1) {
      return `<h1>${text}</h1>`
    }

    const slug = slugger.slug(text)

    return `<h${level} class="flex items-center" id="${slug}">
              <a href="#${slug}" name="${slug}" class="p-1 -ml-1 md:-ml-8 mr-2 hover:bg-slate-100 rounded">
                ${this.bookmarkIcon()}
              </a>
              ${text}
            </h${level}>`
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
   * Returns the HTML for the given table `header` and `body`.
   *
   * @param header
   * @param body
   *
   * @returns {String}
   */
  override table (header: string, body: string): string {
    return `<table class="table-auto">
        ${header}
        ${body}
      </table>`
  }

  /**
   * Returns the HTML for the a list.
   *
   * @param body
   * @param ordered
   *
   * @returns {String}
   */
  override list (body: string, ordered: boolean): string {
    return ordered
      ? `<ol class="leading-5">${body}</ol>`
      : `<ul class="leading-5">${body}</ul>`
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
  override code (content: string, language: string): string {
    if (this.isAlert(language)) {
      return this.renderAlert(content, language)
    }

    return this.highlighter.codeToHtml(content, { lang: language })
  }

  /**
   * Determine whether the given code `language` is an alert.
   *
   * @param {String} language
   *
   * @returns {Boolean}
   */
  private isAlert (language: string): language is AlertTypes {
    return ['info', 'success', 'warning'].includes(language)
  }

  /**
   * Returns the rendered alert block for the given `content`.
   *
   * @param {String} content
   * @param {AlertTypes} language
   *
   * @returns {String}
   */
  private renderAlert (content: string, language: AlertTypes): string {
    const html = marked(content)

    return `<div class="alert alert-${language}">
              <div class="flex-shrink-0 mt-1">
                  <p>${this.alertIconFor(language)}</p>
              </div>
              <div class="ml-4">${html}</div>
            </div>`
  }

  /**
   * Returns the SVG HTML of an info icon.
   *
   * @returns {String}
   */
  private alertIconFor (type: AlertTypes): string {
    switch (type) {
      case 'success':
        return this.alertSuccessIcon()

      case 'info':
        return this.alertInfoIcon()

      case 'warning':
        return this.alertWarningIcon()
    }
  }

  /**
   * Returns the SVG HTML of an info icon.
   *
   * @returns {String}
   */
  private alertSuccessIcon (): string {
    return `
      <svg xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6 text-emerald-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
          <path stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    `
  }

  /**
   * Returns the SVG HTML of an info icon.
   *
   * @returns {String}
   */
  private alertInfoIcon (): string {
    return `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6 text-blue-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
          <path stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
      </svg>
    `
  }

  /**
   * Returns the SVG HTML of an info icon.
   *
   * @returns {String}
   */
  private alertWarningIcon (): string {
    return `
      <svg xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6 text-yellow-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    `
  }
}
