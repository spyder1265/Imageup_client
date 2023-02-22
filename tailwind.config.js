/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      phone : '350px',
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}