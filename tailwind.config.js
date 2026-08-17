/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        accent: '#00df8f',
        'accent-dark': '#00b373',
        'bg-primary': '#0d1116',
        'bg-secondary': '#14181f',
      },
    },
  },
  plugins: [],
}
