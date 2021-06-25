/**
 * --------------------------------------------------------------------------
 * Routes
 * --------------------------------------------------------------------------
 *
 * Details and descriptions about this routes files and maybe about routing?
 *
 */

import { Route } from '@supercharge/facades'
import { ShowDocs } from '../app/http/controllers/ShowDocs'
import { ShowPodcast } from '../app/http/controllers/ShowPodcast'
import { ShowDocsVersion } from '../app/http/controllers/ShowDocsVersion'
import { ShowStartpage } from '../app/http/controllers/ShowStartpage'

Route.get('/', ShowStartpage)

Route.get('/podcast', ShowPodcast)

Route.prefix('/docs').group(() => {
  Route.get('/', ShowDocs)
  Route.get('/:version/:page*', ShowDocsVersion)
})
