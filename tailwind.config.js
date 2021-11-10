'use strict'

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './resources/**/*.hbs',
    './resources/**/*.vue'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ATC Overlook', 'BRHendrix', ...defaultTheme.fontFamily.sans],
        brhendrix: ['BRHendrix', ...defaultTheme.fontFamily.sans],
      },
    }
  },
  variants: {},
  plugins: [
    // require('@tailwindcss/ui'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/custom-forms'),
    require('tailwindcss-textshadow'),
  ]
}
