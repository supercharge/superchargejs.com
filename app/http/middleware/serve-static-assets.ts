
import { ServeStaticAssetsMiddleware as Middleware } from '@supercharge/http'

export class ServeStaticAssets extends Middleware {
  /**
   * Returns the path to the asset files.
   *
   * @returns {String}
   */
  override assetsLocation (): string {
    this.app.logger().alert('public path ' + this.app.publicPath())
    return this.app.publicPath()
  }
}
