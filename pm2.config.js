'use strict'

module.exports = {
  apps: [
    {
      name: 'superchargejs.com',
      script: 'npm',
      args: 'start',
      exec_mode: 'cluster',
      instances: 2,

      /**
       * The `wait-ready` and `listen-timeout` settings support graceful restarts in a
       * zero-downtime manner. A “booted” callback in the HTTP kernel sends the `wait`
       * signal when the server is ready to accept connections. PM2 waits at most
       * the configured `listen-timeout` before marking the app as ready.
       */
      wait_ready: true,
      listen_timeout: 10_000,

      env: {
        NODE_ENV: 'production',
        PORT: 2021
      }
    }
  ]
}