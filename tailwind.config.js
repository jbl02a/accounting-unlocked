/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // The dimmest grey this app is allowed to use, and only for chrome:
        // uppercase micro-labels, pill badges, counters, back/next links. Any
        // sentence he is meant to READ is slate-200 or slate-300 — content
        // styled as chrome is what made the pages look washed out even after
        // the greys cleared AA. 9.5:1 on the card surface, 10.5:1 on the page.
        // Enforced by scripts/check-contrast.mjs.
        dim: '#b2bfd0',
      },
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
