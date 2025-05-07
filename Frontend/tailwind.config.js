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
          DEFAULT: '#FC8019',
          dark: '#e07016',
          light: '#FFA726',
          50: '#FFF3E0',
          100: '#FFE0B2',
          200: '#FFCC80',
          300: '#FFB74D',
          400: '#FFA726',
          500: '#FC8019', // Main primary color
          600: '#FB6D1D',
          700: '#E65100',
          800: '#D84315',
          900: '#BF360C',
        },
        secondary: '#FFFFFF',
        accent: {
          DEFAULT: '#282C3F',
          light: '#3d4152',
          dark: '#1D2029',
        },
        success: {
          DEFAULT: '#60B246',
          light: '#7DC769',
          dark: '#4C8F38',
        },
        error: {
          DEFAULT: '#FF5252',
          light: '#FF7B7B',
          dark: '#E04444',
        },
        background: {
          DEFAULT: '#F8F8F8',
          card: '#FFFFFF',
          dark: '#F0F0F0',
        },
        'light-gray': '#E9E9E9',
        'dark-gray': '#686B78',
        'text': {
          primary: '#282C3F',
          secondary: '#686B78',
          light: '#93959F',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'heading': ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        'card': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'hover': '0 8px 16px rgba(0, 0, 0, 0.1)',
        'nav': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'button': '0 2px 5px rgba(252, 128, 25, 0.3)',
        'dropdown': '0 4px 16px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      transitionDuration: {
        '400': '400ms',
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
}

