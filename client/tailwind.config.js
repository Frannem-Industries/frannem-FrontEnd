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
      animation: {
        'fadeIn': 'fadeIn 0.2s ease-in-out',
        'slideDown': 'slideDown 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { maxHeight: '0', opacity: '0' },
          '100%': { maxHeight: '500px', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
