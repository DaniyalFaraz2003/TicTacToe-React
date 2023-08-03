/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h3: false,
            h4: false,
          },
        },
      },
    },
  },
  plugins: [],
}
