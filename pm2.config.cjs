'use strict'

module.exports = {
  apps: [
    {
      name: 'superchargejs.com',

      /**
       * ts-node doesn’t work with ESM as of Nov, 18th 2023. We need to use a different
       * tool to run the project. We decided to use tsx instead of Node.js because
       * this project is simple and tsx runs TypeScript without extra tooling.
       */
      script: 'server.ts',
      interpreter: 'node',
      interpreter_args: '--import tsx',

      exec_mode: 'cluster',
      instances: 2,

      /**
       * The `wait-ready` and `listen-timeout` settings support graceful restarts in a
       * zero-downtime manner. A “booted” callback in the HTTP kernel sends the `wait`
       * signal when the server is ready to accept connections. PM2 waits at most
       * the configured `listen-timeout` before marking the app as ready.
       */
      wait_ready: true,
      listen_timeout: 15_000
    }
  ]
}
