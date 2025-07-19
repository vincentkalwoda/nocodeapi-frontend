/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}",],
  darkMode: 'media',
  theme: {
    colors: {
      primary: '#0127d7',
      secondary: '#002aff',
      accent: 'rgba(1,39,215,0.55)',
      background: '#0A001A',
      surface: '#1A0033',
      white: '#FFFFFF',
      body: '#d4d7e0',
      muted: '#7b82a3',
      hover: '#1e43ff',
      disabled: '#2c3c5e',
      disabledText: '#8b98b8',
      shadow: '#00000080',
      info: '#4C00FF',
      success: '#00FFA3',
      warning: '#FFC300',
      error: '#FF3B6A',
      green: '#4ece58',
    },
    extend: {
      width: {
        '47/100': '47%',
        '159/500': '31.8%'
      },
      keyframes: {
        slideInLeft: {
          '0%': {transform: 'translateX(-100%)', opacity: '0'},
          '100%': {transform: 'translateX(0)', opacity: '1'},
        },
        slideInRight: {
          '0%': {transform: 'translateX(100%)', opacity: '0'},
          '100%': {transform: 'translateX(0)', opacity: '1'},
        },
      },
      animation: {
        slideInLeft: 'slideInLeft 0.5s ease-out forwards',
        slideInRight: 'slideInRight 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}

