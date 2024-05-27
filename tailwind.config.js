/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        oswalid : ["Oswald", 'sans-serif'],
        ineter : ["Inter", "sans-serif"]
      }
    },
    screens : {
      sm : '480px',
      md : '770px',
      lg : '980px',
      xl : '1440px'
    }
  },
  plugins: [],
}

