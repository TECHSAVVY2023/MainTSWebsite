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
          primary: "#6366f1",
          secondary: "#8b5cf6",
          dark: "#0f172a",
          light: "#f8fafc",
          violet: {
            DEFAULT: '#14082E',
            dark: '#231559',
            border: '#3D2A6E',
            light: '#2A1A5E'
          },
          accent: {
            purple: '#B5A3FF',
            light: '#EEEAFF',
            gold: '#FFD74A'
          },
          neutral: {
            gray: '#D3D3D4',
            card: '#C8C8CC',
            border: '#E5E7EB',
            dark: '#041122'
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