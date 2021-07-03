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
    extend: {
      fontFamily: {
        sans: ['BRHendrix', 'Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
    colors: {
      ...colors,
      'light-blue': colors.sky
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/ui'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/custom-forms'),
    require('tailwindcss-textshadow'),
  ]
}
