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
          primary: '#0f172a',    // Azul marinho (elegante)
          secondary: '#10b981',  // Verde (sucesso/lucro)
          background: '#f8fafc', // Cinza azulado bem clarinho
        }
      }
    },
  },
  plugins: [],
}