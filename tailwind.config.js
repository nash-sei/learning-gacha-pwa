/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#fde047',
          DEFAULT: '#fbbf24',
          dark: '#b45309',
        }
      },
      animation: {
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
      },
      keyframes: {
        sparkle: {
          '0%, 100%': { opacity: 0.3, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.2)' },
        }
      }
    },
  },
  plugins: [],
}
