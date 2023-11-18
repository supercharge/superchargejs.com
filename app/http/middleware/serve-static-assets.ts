
import { ServeStaticAssetsMiddleware as Middleware } from '@supercharge/http'

export class ServeStaticAssets extends Middleware {
  /**
   * Returns the path to the asset files.
   */
  override assetsLocation (): string {
    return this.app.publicPath()
  }
}
