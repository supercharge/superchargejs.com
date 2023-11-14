
import { createApp } from './create-app.js'
import { ConsoleKernel } from '../app/console/kernel.js'
import { ConsoleKernel as ConsoleKernelContract } from '@supercharge/contracts'

/**
 * Creates and returns a console application instance.
 */
export function createConsoleApp (): ConsoleKernelContract {
  return ConsoleKernel.for(
    createApp()
  )
}
