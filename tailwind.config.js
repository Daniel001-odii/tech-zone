/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        tz_blue: "#4E79BC",
        tz_light_blue: "rgb(190, 213, 248, 20%)",
        tz_dark_blue: "#42669E",

        tz_green: "#7BBE64",
        tz_light_green: "rgb(123, 190, 100, 10)",

      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}

