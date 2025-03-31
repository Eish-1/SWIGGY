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
        },
        secondary: '#FFFFFF',
        accent: {
          DEFAULT: '#282C3F',
          light: '#3d4152',
        },
        success: '#60B246',
        error: '#FF5252',
        background: '#F8F8F8',
        'light-gray': '#E9E9E9',
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'heading': ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        'card': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'hover': '0 8px 16px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}

