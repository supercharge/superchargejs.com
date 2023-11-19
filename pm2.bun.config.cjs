'use strict'

module.exports = {
  apps: [
    {
      name: 'superchargejs.com',
      interpreter: 'bun',
      script: 'server.ts',

      /**
       * cluster mode is not working when using a custom "interpreter"
       * @see https://github.com/Unitech/pm2/issues/1575
       */
      // exec_mode: 'cluster',
      // instances: 2,

      /**
       * The `wait-ready` and `listen-timeout` settings support graceful restarts in a
       * zero-downtime manner. A “booted” callback in the HTTP kernel sends the `wait`
       * signal when the server is ready to accept connections. PM2 waits at most
       * the configured `listen-timeout` before marking the app as ready.
       */
      wait_ready: true,
      listen_timeout: 15_000,
    }
  ]
}
