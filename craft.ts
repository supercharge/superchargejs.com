#!/usr/bin/env node

import { createConsoleApp } from './bootstrap/create-console-app'

/**
 * Start a command line application, called “craft”. Craft commands
 * can scaffold features or project files. The CLI command will
 * execute in the terminal and terminate itself once finished.
 */
// eslint-disable-next-line @typescript-eslint/no-floating-promises
createConsoleApp().run()
