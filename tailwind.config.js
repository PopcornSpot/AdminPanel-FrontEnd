/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // Add custom styles if needed
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.no-spinner': {
          '&::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: '0',
          },
          '&::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: '0',
          },
          '-moz-appearance': 'textfield', // For Firefox
        },
      });
    },
  ],
};

