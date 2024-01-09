/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    screens:{
      'smallphone':'452px'
    },
    extend: {
      animation:{       
          'spin-slow': 'spin 10s linear infinite',        
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

