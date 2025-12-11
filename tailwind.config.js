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
          darkest: "#1E1E1E",
          dark: "#685F5F",
          light: "#FB8300",
        },
        secondary: {
          DEFAULT: "#9F9F9F",
          light: "#F3F6F9",
        },
        btn: {
          primary: "#1262BE",
          success: "#22C813",
          pending: "#FADD00",
          contacted: "#407BFF",
          failed: "#E41E1E",
          danger: "#D91515",
          save: "#1E9826",
          disabled: "#9CAFC8",
          dark: "#122786",
          light: "#FFFAFA",
        },
      },
      fontFamily: {
        lato: ['"Lato"', 'sans-serif'],
        montserrat: ['"Montserrat"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
