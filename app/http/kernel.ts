
import { MiddlewareCtor } from '@supercharge/contracts'
import { HttpKernel as Kernel } from '@supercharge/core'
import { HandleCorsMiddleware as HandleCors } from '@supercharge/http'
import { ServeStaticAssets } from './middleware/serve-static-assets.js'

export class HttpKernel extends Kernel {
  /**
   * Register the booting or booted callbacks. For example, you may use a `booted`
   * callback to send a "ready" signal to PM2 (or any other process manager)
   * informing that your HTTP server is ready to accept incoming requests.
   */
  override register (): void {
    this.booted(() => this.sendReadySignal())
  }

  /**
   * Send the `ready` signal to the PM2 process manager. PM2 waits for the ready
   * signal before considering the application as "online". This feature allows
   * us to make use of zero-downtime restarts keeping processes available.
   */
  private sendReadySignal (): void {
    if (process.send) {
      this.app().logger().info('Sent "ready" signal to the PM2 process')

      process.send('ready')
    }
  }

  /**
   * Returns the application’s global middleware stack. Every middleware
   * listed here runs on every request to the application.
   */
  override middleware (): MiddlewareCtor[] {
    return [
      HandleCors,
      ServeStaticAssets,
    ]
  }

  /**
   * Returns available route-level middleware. Use the keys as middleware
   * names when defining routes. For example, require authentication
   * for inidividual routes by using the 'auth' middleware.
   *
   * @example
   * ```
   * Route.middleware('auth').group(() => {
   *   // all routes in this group require authentication
   *
   *   Route.get('/profile', …)
   * })
   * ```
   */
  override routeMiddleware (): { [name: string]: MiddlewareCtor} {
    return {
      // auth: AuthenticateRequest
    }
  }
}
