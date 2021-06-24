/**
 * --------------------------------------------------------------------------
 * Routes
 * --------------------------------------------------------------------------
 *
 * Details and descriptions about this routes files and maybe about routing?
 *
 */

import { Route } from '@supercharge/facades'
import { ShowDocsController } from '../app/http/controllers/ShowDocsController'
import { ShowDocsVersionController } from '../app/http/controllers/ShowDocsVersionController'

Route.get('/', async ({ response }) => {
  return response.view('index')
})

Route.group({ prefix: '/docs' }, () => {
  Route.get('/', ShowDocsController)
  Route.get('/:version/:page*', ShowDocsVersionController)
})

