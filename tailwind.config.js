/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './*/**.html',
    './js/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        "roboto": ["Roboto", "sans-serif"],
      },
      colors: {
        "dark": "#030f33",
        "darker": "#04071B",
        "accent": "#2E45ED",
        "light": "#F4EFDC",
      },
    },
  },
  plugins: [],
}