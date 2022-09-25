/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*{ts,tsx}", "./index.html"],
  theme: {
    fontFamily: {
      sans: ["Nunito", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        header: "url('/background.svg')",
      },
      colors: {
        blue: {
          900: "#040F1A",
          850: "#071422",
          800: "#0B1B2B",
          700: "#112131",
          600: "#1C2F41",
          500: "#3294F8",
          400: "#3a536b",
          300: "#7b96b2",
          200: "#AFC2D4",
          100: "#C4D4E3",
          50: "#E7EDF4",
        },
        prose: {
          bold: "#AFC2D4",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
