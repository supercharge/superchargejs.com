'use strict'

import { createApp } from './create-app'
import { HttpKernel } from '../app/http/kernel'
import { HttpKernel as HttpKernelContract } from '@supercharge/contracts'

/**
 * Creates and returns an HTTP application instance.
 */
export function createHttpApp (): HttpKernelContract {
  return HttpKernel.for(
    createApp()
  )
}
