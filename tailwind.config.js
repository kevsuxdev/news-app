/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        nunito: 'Nunito-Regular',
        'nunito-medium': 'Nunito-Medium',
        'nunito-semi-bold': 'Nunito-SemiBold',
        'nunito-bold': 'Nunito-Bold',
        'nunito-extra-bold': 'Nunito-ExtraBold',
        'nunito-black': 'Nunito-Black',
      },
      backgroundColor: {
        main: '#064EE9',
      },
      colors: {
        main: '#064EE9',
      },
      borderColor: {
        main: '#064EE9',
      },
    },
  },
  plugins: [],
}
