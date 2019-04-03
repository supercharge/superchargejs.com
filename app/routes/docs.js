'use strict'

const _ = require('lodash')
const Config = require('@supercharge/framework/config')
const Documentation = require('./_docs/documentation')

module.exports = [
  {
    method: 'GET',
    path: '/docs',
    config: {
      handler: (_, h) => h.redirect(`/docs/${Config.get('docs.default')}`)
    }
  },

  {
    method: 'GET',
    path: '/docs/{version}/{page?}',
    config: {
      handler: async (request, h) => {
        const docs = new Documentation()
        const { version, page = 'installation' } = request.params

        if (!docs.isValidVersion(version)) {
          return h.redirect(`/docs/${Config.get('docs.default')}/${version}`)
        }

        const content = await docs.get(version, page)

        if (!content) {
          return h.view('errors/404').code(404)
        }

        const title = `${_.startCase(page).replace('-', ' ') || 'Installation'} — Supercharge`

        return h.view('docs', {
          title,
          version,
          currentPage: page,
          docsContent: content,
          versions: docs.versions(),
          index: await docs.getIndex(version),
          currentVersion: docs.versions()[version]
        })
      }
    }
  }
]
