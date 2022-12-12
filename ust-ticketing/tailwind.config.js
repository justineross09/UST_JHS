/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1537px',
      },

      backgroundImage: {
        background: "url('/public/bg.jpg')",
      },

      colors: {
        primary: {
          DEFAULT: '#F1C411',
          50: '#FBEFBE',
          100: '#FAEAAB',
          200: '#F8E185',
          300: '#F6D75E',
          400: '#F3CE38',
          500: '#F1C411',
          600: '#BF9B0B',
          700: '#8A7008',
          800: '#554505',
          900: '#201A02',
        },
        secondary: {
          DEFAULT: '#333333',
          50: '#8F8F8F',
          100: '#858585',
          200: '#707070',
          300: '#5C5C5C',
          400: '#474747',
          500: '#333333',
          600: '#171717',
          700: '#000000',
          800: '#000000',
          900: '#000000',
        },
        tertiary: {
          DEFAULT: '#A8A8A8',
          50: '#FFFFFF',
          100: '#FAFAFA',
          200: '#E5E5E5',
          300: '#D1D1D1',
          400: '#BCBCBC',
          500: '#A8A8A8',
          600: '#8C8C8C',
          700: '#707070',
          800: '#545454',
          900: '#383838',
        },
      },
    },
  },
  plugins: [],
};

