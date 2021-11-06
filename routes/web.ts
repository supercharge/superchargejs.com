/**
 * --------------------------------------------------------------------------
 * Routes
 * --------------------------------------------------------------------------
 *
 * Details and descriptions about this routes files and maybe about routing?
 *
 */

import { Route } from '@supercharge/facades'
import { HttpContext } from '@supercharge/contracts'
import { ShowDocs } from '../app/http/controllers/ShowDocs'
import { ShowPodcast } from '../app/http/controllers/ShowPodcast'
import { ShowStartpage } from '../app/http/controllers/ShowStartpage'
import { ShowDocsVersion } from '../app/http/controllers/ShowDocsVersion'
import { ShowNews } from '../app/http/controllers/News'

Route.get('/', ShowStartpage)

Route.get('/news', ShowNews)
Route.get('/podcast', ShowPodcast)

Route.prefix('/docs').group(() => {
  Route.get('/', ShowDocs)
  Route.get('/:page', ShowDocs)
  Route.get('/:version/:page', ShowDocsVersion)
})

Route.get('/404', async ({ response }: HttpContext) => {
  return response.status(404).view('errors/404')
})
