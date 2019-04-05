'use strict'

module.exports = {
  name: 'decorate-404-quickshot',
  register: (server) => {
    async function render404 () {
      return this.view('errors/404').code(404)
    }

    server.decorate('toolkit', 'notFound', render404)
  }
}
