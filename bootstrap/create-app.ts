
import Path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Facade } from '@supercharge/facades'
import { Application } from '@supercharge/core'
import { ErrorHandler } from '../app/errors/handler.js'
import { Application as ApplicationContract } from '@supercharge/contracts'

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = Path.dirname(fileURLToPath(import.meta.url))
const appRootDir = Path.resolve(__dirname, '..')

/**
 * Creates and returns an HTTP application instance.
 */
export function createApp (): ApplicationContract {
  return Application
    .createWithAppRoot(appRootDir)
    .withErrorHandler(ErrorHandler)
    .onBooting(app => {
      Facade.setApplication(app)
    })
}
