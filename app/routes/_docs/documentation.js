'use strict'

const Markdown = require('./renderer')
const Fs = require('@supercharge/framework/filesystem')
const Helper = require('@supercharge/framework/helper')
const Config = require('@supercharge/framework/config')

class Documentation {
  isValidVersion (version) {
    return !!this.versions()[version]
  }

  async get (version, page) {
    return this.readAndParseFile(version, `${page}.md`)
  }

  async getIndex (version) {
    return require(Helper.resourcePath(`docs/${version}/navigation`))
  }

  async readAndParseFile (version, file) {
    const path = Helper.resourcePath(`docs/${version}/${file}`)

    if (await Fs.exists(path)) {
      const content = await Fs.readFile(path)

      return this.replaceLinks(version, Markdown(content))
    }
  }

  replaceLinks (version, content) {
    const pattern = encodeURIComponent('{{version}}')
    const regEx = new RegExp(pattern, 'g')

    return content.replace(regEx, version)
  }

  versions () {
    return Config.get('docs.versions')
  }
}

module.exports = Documentation
