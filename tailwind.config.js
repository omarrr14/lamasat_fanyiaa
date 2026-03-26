/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7b431c',
          light: '#8c532d',
          dark: '#5a2f10'
        },
        accent: {
          DEFAULT: '#cc7b2c',
          light: '#e08a38',
          dark: '#ad611c'
        },
        cream: {
          DEFAULT: '#fffaf5',
          dark: '#f0e6da'
        }
      },
      fontFamily: {
        sans: ['Cairo', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'bounce-slow': 'bounce 4s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
