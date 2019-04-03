'use strict'

module.exports = {
  method: 'GET',
  path: '/',
  handler: (_, h) => h.view('index', null, { layout: 'startpage' })
}
