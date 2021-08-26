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
import { ShowStartpage } from '../app/http/controllers/ShowStartpage'
import { ShowDocsVersion } from '../app/http/controllers/ShowDocsVersion'

Route.get('/', ShowStartpage)

Route.get('/podcast', ShowPodcast)

Route.prefix('/docs').group(() => {
  Route.get('/', ShowDocs)
  Route.get('/:page', ShowDocs)
  Route.get('/:version/:page', ShowDocsVersion)
})
