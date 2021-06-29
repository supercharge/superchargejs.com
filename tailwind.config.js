'use strict'

const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [
    './resources/**/*.hbs',
    './resources/**/*.vue'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      'light-blue': colors.sky
    },
    extend: {
      fontFamily: {
        sans: ['BRHendrix', 'Inter var', ...defaultTheme.fontFamily.sans],
      },
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/ui'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/custom-forms')
  ]
}
