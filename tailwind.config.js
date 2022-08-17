module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#393978",
        primary_light: "#635FF2",
        primary_lighter: "#A9A9FF",
        secondary: "#2CBF00",
        gray_dark: "#9CA3AF",
        gray_light: "#F0F0FC",
        input_bg: "#E5E7EB",
      },

      borderRadius: {
        primary: "9px",
        secondary: "20px",
      },

      boxShadow: {
        primary:
          "inset 0px -4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(255, 255, 255, 0.25)",
        primary_2: "inset 0px 4px 4px rgba(141, 141, 141, 0.25)",
      },

      dropShadow: {
        primary: "0px 4px 30px rgba(99, 95, 242, 0.25)",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
