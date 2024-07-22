/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom:
          "-2px -2px 5px rgba(109, 142, 195, .5), 3px 3px 10px rgba(109, 142, 196, .2)",
      },
      colors: {
        "bg-gray": "#F9FAFC",
        primary: {
          50: "#E1F2FC",
          100: "#B3DEFA",
          200: "#80C7F6",
          300: "#4DAFF1",
          400: "#269BEF",
          500: "#007BBB",
          600: "#006AA7",
          700: "#00578D",
          800: "#004474",
          900: "#002D54",
          950: "#001938",
        },
      },
    },
    plugins: [],
  },
};
