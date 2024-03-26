/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    colors: {
      "main-purple": "#635FC7",
      "main-purple-hover": "#A8A4FF",
      black: "#000112",
      "very-dark-grey-dark-bg": "#20212C",
      "dark-grey": "#2B2C37",
      "lines-dark": "#3E3F4E",
      "medium-grey": "#828FA3",
      "line-light": "#E4EBFA",
      "light-grey-light-bg": "#F4F7FD",
      white: "#FFFFFF",
      red: "#EA5555",
      "red-hover": "#FF9898",
    },
    screens: {
      mobile: "655px",
    },
    extend: {},
  },
  plugins: [],
};
