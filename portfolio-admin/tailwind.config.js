/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#e6fcf5',
          500: '#00df8f',
          600: '#00b373',
          900: '#0b1014',
        }
      }
    },
  },
  plugins: [],
}
