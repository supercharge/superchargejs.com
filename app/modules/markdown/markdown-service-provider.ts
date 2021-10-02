'use strict'

import { ServiceProvider } from '@supercharge/support'
import { MarkdownRenderer } from './markdown-renderer'

export class MarkdownServiceProvider extends ServiceProvider {
  /**
   * Register application services to the container.
    */
  override register (): void {
    this.app().singleton(MarkdownRenderer.name, () => {
      return new MarkdownRenderer(this.app())
    })
  }

  /**
   * Boot application services.
   */
  override async boot (): Promise<void> {
    await this.app().make<MarkdownRenderer>(MarkdownRenderer.name).boot()
  }
}
