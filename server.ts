'use strict'

import { createHttpApp } from './bootstrap/create-http-app'

/**
 * Kick off an HTTP server that binds to the defined `PORT` from your .env file on `localhost`.
 */
//  eslint-disable-next-line @typescript-eslint/no-floating-promises
createHttpApp().startServer()
