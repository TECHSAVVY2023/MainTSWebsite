/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./components/**/*.{js,vue,ts}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./app/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./app.vue",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#2E1368',
          secondary: '#6126B1',
          dark: '#1A1A1D',
          light: '#FFFFFF',
          violet: {
            DEFAULT: '#F5F7FA',
            dark: '#ECEFF4',
            border: '#D8DEE8',
            light: '#FFFFFF'
          },
          accent: {
            purple: '#6126B1',
            light: '#B18AF3',
            gold: '#B18AF3'
          },
          neutral: {
            gray: '#F4F4F6',
            card: '#FFFFFF',
            border: '#E0E0E0',
            dark: '#1A1A1D',
            steel: '#9E9E9E'
          }
        },
        fontFamily: {
          'inter': ['Inter', 'system-ui', 'sans-serif']
        },
        animation: {
          'float': 'float 6s ease-in-out infinite',
          'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'gradient': 'gradient 8s ease infinite',
          'fade-in': 'fadeIn 0.5s ease-in-out',
          'slide-up': 'slideUp 0.4s ease-out',
          'section-wire-flow': 'section-wire-flow 4s linear infinite'
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-20px)' }
          },
          gradient: {
            '0%, 100%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' }
          },
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' }
          },
          slideUp: {
            '0%': { transform: 'translateY(20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' }
          },
          'section-wire-flow': {
            to: { strokeDashoffset: '-90' }
          }
        }
      }
    },
    plugins: [],
  }