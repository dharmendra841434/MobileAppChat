const {default: appColors} = require('./src/constant/appColors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Update this to include the paths to all of your component files.
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: appColors.primary,
        secondary: appColors.secondary,
        background: appColors.background,
        textColor: appColors.secondary,
      },
    },
  },
  plugins: [],
};
