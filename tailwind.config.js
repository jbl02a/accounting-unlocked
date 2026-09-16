/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // The dimmest grey this app is allowed to use for text. Tailwind's
        // slate-400 reads at 6.9:1 on our card surface and slate-500 at 3.7:1,
        // which is below WCAG AA and genuinely hard to read on a phone at night.
        // This clears AAA (8.2:1) and is enforced by scripts/check-contrast.mjs.
        dim: '#a3b1c4',
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
