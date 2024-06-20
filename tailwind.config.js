/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f1f8f6",
          100: "#d7eae3",
          200: "#bedcd2",
          300: "#93c2b6",
          400: "#65a295",
          500: "#448579",
          600: "#316a60",
          700: "#28544e",
          800: "#21443f",
          900: "#1c3835",
          950: "#0f1f1d",
        },
        material: {
          border: "#c4c4c4",
        },
      },
    },
  },
  plugins: [],
};
