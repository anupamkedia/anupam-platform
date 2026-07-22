import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EBF5FB', 100: '#D6EBF7', 200: '#A8D4EE',
          300: '#5DADE2', 400: '#2E86C1', 500: '#1B3A5C',
          600: '#163250', 700: '#112944', 800: '#0D2038', 900: '#08172C',
        },
        accent: {
          50: '#FDEDEC', 100: '#FADBD8', 200: '#F1948A',
          300: '#E74C3C', 400: '#C0392B', 500: '#A93226',
          600: '#922B21', 700: '#7B241C', 800: '#641E16', 900: '#4D1711',
        },
        steel: {
          50: '#F8F9FA', 100: '#EAECEE', 200: '#D5D8DC',
          300: '#ABB2B9', 400: '#7F8C8D', 500: '#5D6D7E',
          600: '#4D5D6E', 700: '#3D4D5E', 800: '#2D3D4E', 900: '#1D2D3E',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'count-up': 'countUp 2s ease-out forwards',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
};
export default config;
