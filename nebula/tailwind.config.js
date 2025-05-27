/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          1: '#6061BF',   // "Primary/01", 100% opacity
          2: '#8687CF',   // "Primary/02"
          3: '#ACADE5',   // "Primary/03"
          '1-70': 'rgba(96, 97, 191, 0.7)',   // "Primary/01", 70% opacity
          '1-50': 'rgba(96, 97, 191, 0.5)',   // "Primary/01", 50% opacity
          '1-10': 'rgba(96, 97, 191, 0.1)',   // "Primary/01", 10% opacity
          '1-5': 'rgba(96, 97, 191, 0.05)',   // "Primary/01", 5% opacity
        }, 
        neutral: {
          1: '#262629',
          2: '#323236',
          3: '#5B5B61',
          '1-85': 'rgba(41, 41, 43, 0.85)',   // "#29292B", 85% opacity
        }, 
        accent: {
          DEFAULT: '#FFE4A5',
          '50': 'rgba(255, 228, 165, 0.5)',   // "Accent", 50% opacity
        }, 
        white: {
          DEFAULT: '#FFFFFF',
          '70': 'rgba(255, 255, 255, 0.7)',   // "White", 70% opacity
          '50': 'rgba(255, 255, 255, 0.5)',   // "White", 50% opacity
          '25': 'rgba(255, 255, 255, 0.25)',
          '10': 'rgba(255, 255, 255, 0.1)',   // "White", 10% opacity
          '6': 'rgba(255, 255, 255, 0.06)',   // "White", 6% opacity
        }
      },
      fontFamily: {
        sans: [
          "Inter",      // default
          "Public Sans",   // fallback
        ],
      }
    },
  },
  plugins: [],
}

