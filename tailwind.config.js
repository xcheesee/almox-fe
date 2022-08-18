/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        material: {
          border: '#c4c4c4'
        }
      }
    },
  },
  plugins: [],
}
