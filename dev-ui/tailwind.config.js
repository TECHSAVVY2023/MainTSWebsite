/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/components/**/*.{js,vue,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.{js,ts}",
    "./app/app.vue",
    "./app/error.vue",
  ],
  theme: {
    extend: {
      animation: {
        'section-wire-flow': 'section-wire-flow 4s linear infinite',
      },
      keyframes: {
        'section-wire-flow': {
          to: { strokeDashoffset: '-90' },
        },
      },
    },
  },
  plugins: [],
}