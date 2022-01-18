'use strict'

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './resources/**/*.hbs',
    './resources/**/*.vue',
    './app/modules/markdown/docs-renderer.ts',
  ],
  theme: {
    extend: {
      fontSize: {
        sm: '.825rem',
        md: '.875rem'
      },
      fontFamily: {
        sans: ['ATC Overlook', 'BRHendrix', ...defaultTheme.fontFamily.sans],
        brhendrix: ['BRHendrix', ...defaultTheme.fontFamily.sans],
        mono: ['Cascadida Code', ...defaultTheme.fontFamily.mono],
      },
      typography (theme) {
        return {
          DEFAULT: {
            css: {
              color: theme('colors.slate.700'),

              h1: {
                color: theme('colors.gray.900'),
              },

              h2: {
                color: theme('colors.gray.900'),
                'margin-bottom': theme('margin.3'),
                'margin-top': theme('margin.16')
              },

              h3: {
                color: theme('colors.gray.900'),
                'margin-bottom': theme('margin.2'),
                'margin-top': theme('margin.14')
              },

              h4: {
                color: theme('colors.gray.900'),
                'margin-top': theme('margin.12')
              },

              pre: {

              },
            },
          }
        }
      },
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-textshadow'),
  ]
}
