'use strict'

import { Documentation } from '../../models/documentation'
import { Application, HttpContext } from '@supercharge/contracts'
import { Config } from '@supercharge/facades/dist'

export class ShowDocsVersionController {
  private app: Application

  constructor(app: Application) {
    this.app = app
  }
  /**
   * Handle the given request.
   */
  handle ({ request, response }: HttpContext): unknown {
    const version =  request.params.version
    // const { version, page = 'installation' }: { version: string, page: string} = request.params

    const docs = new Documentation(this.app, version as string)

    if (!docs.isValidVersion()) {
      return response.redirect().to(`/docs/${Config.get('docs.default')}/${page}`)
    }

    const content = await docs.get(page)

    if (!content) {
      return h.notFound()
    }

    const title = `${_.startCase(page).replace('-', ' ') || 'Installation'} — Supercharge`

    return response.view('docs', {
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
