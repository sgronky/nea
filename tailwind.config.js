const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  purge: [],
  theme: {
    colors: {
      red: '#E0301E',
      yellow: '#FFB600',
      green: '#20A3A3',
      black: '#504040',
      gray: '#9b9696',
      graylight: '#e3dcdc',
      white: '#ffffff',
    },  

    listStyleType: {
      none: 'none',
      square: 'square',
      decimal: 'decimal',
    },

    opacity: {
      '0': '0',
      '5': '.05',
      '10': '0.1',
      '25': '0.25',
      '50': '0.50',
      '75': '0.75',
      '90': '0.90',
    },

    boxShadow: {
      ...defaultTheme.boxShadow,
      'focus-red': '0 0 0 3px rgba(224, 48, 30, 0.3)',
    },

    extend: {
      fontFamily: {
        sans: ['Rubik', ...defaultTheme.fontFamily.sans],
      }
    },
  },

  variants: {
    borderWidth: ['responsive', 'hover', 'focus', 'active'],
    listStyleType: ['responsive'],
  },

  plugins: [],
}
