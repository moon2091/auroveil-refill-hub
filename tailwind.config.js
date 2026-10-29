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
          50: '#f6f7f6',
          100: '#e3e8e3',
          200: '#c5d0c5',
          500: '#587358',
          600: '#465d46',
          700: '#384a38',
          800: '#2c3a2c',
          900: '#232e23',
        },
        gold: {
          400: '#d4af37',
          500: '#c59f27',
          600: '#a8841c',
        }
      }
    },
  },
  plugins: [],
}
