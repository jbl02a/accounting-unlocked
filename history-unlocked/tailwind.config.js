/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'tilt-left': 'tiltLeft 0.5s ease-out forwards',
        'tilt-right': 'tiltRight 0.5s ease-out forwards',
      },
      keyframes: {
        tiltLeft: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-10deg)' },
        },
        tiltRight: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(10deg)' },
        },
      },
    },
  },
  plugins: [],
}
