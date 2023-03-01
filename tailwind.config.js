/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        "s-blue-500": "#00C9FF",
        "s-green-100": "#92FE9D",
        "gray-1": "#21242D"
      },
      keyframes: {
        wiggle: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(180deg)' },
        }
      },
      animation: {
        'rotate': 'wiggle 200ms linear forwards ',
      },
    },
  },
  plugins: [],
}
