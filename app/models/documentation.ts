'use strict'

import Fs from '@supercharge/fs'
import { Markdown } from './renderer'
import { Config } from '@supercharge/facades'
import { Application } from '@supercharge/contracts'

export class Documentation {
  private readonly app: Application
  private readonly version: string

  constructor (app: Application, version: string) {
    this.app = app
    this.version = version
  }

  async get (page: string): Promise<string> {
    return this.readAndParseFile(`${page}.md`)
  }

  async getIndex (): Promise<string> {
    return require(
      this.app.resourcePath(`docs/${this.version}/navigation`)
    )
  }

  async readAndParseFile (file: string): Promise<string> {
    const path = this.app.resourcePath(`docs/${this.version}/${file}`)

    if (await Fs.exists(path)) {
      const content = await Fs.readFile(path)

      return this.replaceLinks(Markdown(content))
    }
  }

  replaceLinks (content: string): string {
    const pattern = encodeURIComponent('{{version}}')
    const regEx = new RegExp(pattern, 'g')

    return content.replace(regEx, this.version)
  }

  isValidVersion (): boolean {
    return !!this.versions()[this.version]
  }

  versions (): { [key: string]: string } {
    return Config.get('docs.versions')
  }
}

module.exports = Documentation
