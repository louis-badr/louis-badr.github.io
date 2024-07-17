/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}", "./*/**/*.{html,js}"],
  theme: {
    extend: {
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