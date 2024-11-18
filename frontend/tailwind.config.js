/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        lightLightBlue: '#CAF0F8',  
        lightDarkBlue: '#00B4D8', 
        darkLightBlue: '#7AB2D3',
        darkDarkBlue: '#000000'},
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 100 },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.4s ease-in-out forwards",
      },
      boxShadow: {
        customShadow: "rgba(0, 0, 0, 0.12) 0px 6px 16px"
      }
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
}

