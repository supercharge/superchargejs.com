'use strict'

import Path from 'path'
import { Facade } from '@supercharge/facades'
import { Application } from '@supercharge/core'
import { ErrorHandler } from '../app/errors/handler'
import { Application as ApplicationContract } from '@supercharge/contracts'

/**
 * Creates and returns an HTTP application instance.
 */
export function createApp (): ApplicationContract {
  return Application
    .createWithAppRoot(Path.resolve(__dirname, '..'))
    .withErrorHandler(ErrorHandler)
    .onBooting(app => {
      Facade.setApplication(app)
    })
}
