/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    darkMode: 'class',
    extend: {
      colors: {
        'royal-blue': '#3375FF',
        'sky-blue': '#5B91FF',
        'deep-blue': '#1E4AD9',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
