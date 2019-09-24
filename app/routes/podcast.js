'use strict'

module.exports = {
  method: 'GET',
  path: '/podcast',
  handler: (_, h) => h.view('podcast', null, { layout: 'startpage' })
}
