module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        'primary-red': '#c1292e',
        'primary-red-hover': '#a11e2a',
      },
      fontFamily: {
        sans: [
          'Roboto',
          'Helvetica',
          'Helvetica Neue',
          'Nunito Sans',
          'sans-serif',
        ],
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
