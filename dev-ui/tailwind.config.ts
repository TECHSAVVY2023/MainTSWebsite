import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
    './app/error.vue',
  ],
  theme: {
    extend: {
      animation: {
        'section-wire-flow': 'section-wire-flow 3.4s linear infinite',
        'float-card': 'float-card 4s ease-in-out infinite',
        'twinkle-soft': 'twinkle-soft 4s ease-in-out infinite',
        marquee: 'marquee 55s linear infinite',
        'gradient-pan': 'gradient-pan 3s ease infinite',
        'progress-shrink': 'progress-shrink 4s linear infinite',
        'sparkle-burst': 'sparkle-burst 1s ease-out forwards',
        'float-up': 'float-up 12s linear infinite',
      },
      keyframes: {
        'section-wire-flow': {
          to: { strokeDashoffset: '-144' },
        },
        'float-card': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'twinkle-soft': {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.7)' },
          '50%': { opacity: '1', transform: 'scale(1.4)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-100% / 3))' },
        },
        'gradient-pan': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'progress-shrink': {
          from: { width: '100%' },
          to: { width: '0%' },
        },
        'sparkle-burst': {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0)' },
        },
        'float-up': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(-120vh)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
