/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
   darkMode: 'class',
   theme: {
    extend: {
      colors: {
        primaryLight: '#3490dc',
        primaryDark: '#4a5568',
        secondaryDark: '#2d3748',
      },
    },
  },
   variants: {
     extend: {},
   },
   plugins: [],
 }
