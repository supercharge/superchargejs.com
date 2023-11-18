'use strict'

const cssnano = require('cssnano')

module.exports = ({ env }) => {
  return {
    plugins: [
      require('tailwindcss'),
      require('autoprefixer'),
    ].concat(
      env === 'production'
        ? [cssnano({ preset: 'default' })]
        : []
    )
  }
}
