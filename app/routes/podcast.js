'use strict'

module.exports = {
  method: 'GET',
  path: '/podcast',
  handler: (_, h) => h.view('podcast', {
    title: 'A Supercharge Tale Podcast'
  }, {
    layout: 'startpage'
  })
}
