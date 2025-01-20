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
        menu: {
          border: {
            dark: "#4A4A4A",
            light: "#E0E0E0",
          },
        },
        background: {
          dark: "#181818",
        },
      },
    },
  },
  plugins: [],
};
