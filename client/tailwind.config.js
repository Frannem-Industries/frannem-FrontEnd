/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#363563",
        "lighter-blue": "#f5f5f2",
        "light-blue": "#32a6ee",
        "primary-red": "#363563",
        "primary-green": "#196c1f",
        "primary-orange": "#FF6C07",
      },
    },
  },
  plugins: [],
};
