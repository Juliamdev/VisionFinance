/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        finance: {
          primary: '#0f172a',
          secondary: '#10b981',
          background: '#f8fafc',
        }
      }
    },
  },
  plugins: [],
}