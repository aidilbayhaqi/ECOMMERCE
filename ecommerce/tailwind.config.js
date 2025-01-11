/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        primary: "#6482AD",
        secondary:"#7FA1C3",
        dark: {
          primary: "#0C0C0C",
          secondary: "#1E201E",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};