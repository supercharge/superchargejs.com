
// import Middleware from '@supercharge/http-server/middleware/verify-csrf-token'

export default class VerifyCsrfToken {
  /**
   * Returns an array of URIs that should be excluded from CSRF verfication.
   */
  exclude (): string[] {
    return [
      // '/stripe/*',
      // '/braintree/*',
      // '/a/webhook/endpoint
    ]
  }
}
