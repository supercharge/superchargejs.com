'use strict'

const Markdown = require('./renderer')
const Fs = require('@supercharge/framework/filesystem')
const Helper = require('@supercharge/framework/helper')
const Config = require('@supercharge/framework/config')

class Documentation {
  constructor ({ version }) {
    this.version = version
  }

  async get (page) {
    return this.readAndParseFile(`${page}.md`)
  }

  async getIndex () {
    return require(Helper.resourcePath(`docs/${this.version}/navigation`))
  }

  async readAndParseFile (file) {
    const path = Helper.resourcePath(`docs/${this.version}/${file}`)

    if (await Fs.exists(path)) {
      const content = await Fs.readFile(path)

      return this.replaceLinks(Markdown(content))
    }
  }

  replaceLinks (content) {
    const pattern = encodeURIComponent('{{version}}')
    const regEx = new RegExp(pattern, 'g')

    return content.replace(regEx, this.version)
  }

  isValidVersion () {
    return !!this.versions()[this.version]
  }

  versions () {
    return Config.get('docs.versions')
  }
}

module.exports = Documentation
