
import { createApp } from './create-app.js'
import { HttpKernel } from '../app/http/kernel.js'

/**
 * Creates and returns an HTTP application instance.
 */
export function createHttpApp (): HttpKernel {
  return new HttpKernel(
    createApp()
  )
}
