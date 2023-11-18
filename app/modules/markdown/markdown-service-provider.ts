
import { ServiceProvider } from '@supercharge/support'
import { MarkdownRenderer } from './markdown-renderer.js'

export class MarkdownServiceProvider extends ServiceProvider {
  /**
   * Register application services to the container.
    */
  override register (): void {
    this.app().singleton(MarkdownRenderer, () => {
      return new MarkdownRenderer(
        this.app()
      )
    })
  }

  /**
   * Boot application services.
   */
  override async boot (): Promise<void> {
    await this.app().make(MarkdownRenderer).boot()
  }
}
