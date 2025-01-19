/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  important: true,
  theme: {
    extend: {
      colors: {
        form: {
          darkgray: "#2D2D2D",
          gray: "#3A3A3A",
        },
        background: {
          dark: "#181818",
        },
      },
    },
  },
  plugins: [],
};
