module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'primary' : '#04150A',
        'secondary' : '#25C65B',
        'bg' : '#FAFDFF'
      }
    },
  },
  plugins: [],
}
