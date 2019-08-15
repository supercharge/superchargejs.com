'use strict'

const _ = require('lodash')
const Config = require('@supercharge/framework/config')
const Documentation = require('./_docs/documentation')

module.exports = [
  {
    method: 'GET',
    path: '/docs',
    options: {
      handler: (_, h) => h.redirect(`/docs/${Config.get('docs.default')}`)
    }
  },

  {
    method: 'GET',
    path: '/docs/{version}/{page?}',
    options: {
      handler: async (request, h) => {
        const { version, page = 'installation' } = request.params
        const docs = new Documentation({ version })

        if (!docs.isValidVersion()) {
          return h.redirect(`/docs/${Config.get('docs.default')}/${version}`)
        }

        const content = await docs.get(page)

        if (!content) {
          return h.notFound()
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
