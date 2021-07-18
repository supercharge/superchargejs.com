'use strict'

import { Command } from '@supercharge/console'

export default class Inspire extends Command {
  /**
   * Configure this command.
   */
  configure (): void {
    this
      .name('inspire')
      .description('Print an inspiring quote.')
  }

  /**
   * Run the command action.
   */
  async run (): Promise<any> {
    console.log('Sometimes you win. Sometimes you learn.')
  }
}
