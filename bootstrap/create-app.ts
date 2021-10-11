'use strict'

import Path from 'path'
import { Facade } from '@supercharge/facades'
import { Application } from '@supercharge/core'
import { ErrorHandler } from '../app/errors/handler'

/**
 * Creates and returns an HTTP application instance.
 */
export function createApp (): Application {
  return Application
    .createWithAppRoot(Path.resolve(__dirname, '..'))
    .withErrorHandler(ErrorHandler)
    .booting(app => {
      Facade.setApplication(app)
    })
}
