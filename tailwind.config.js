/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif'],
      },
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        'figma-gray-200': '#d8d8d8',
        'figma-black': '#000000',
        'figma-white': '#ffffff',
        'figma-gray-950': '#2c2c2c',
        'figma-green-300': '#3effcd',
      },
      fontSize: {
        '32': ['32px', { lineHeight: '1', letterSpacing: '-0.25px' }],
        '26': ['26px', { lineHeight: '1', letterSpacing: '-0.25px' }],
        '20': ['20px', { lineHeight: '1', letterSpacing: '-0.25px' }],
        '18': ['18px', { lineHeight: '1', letterSpacing: '0px' }],
        '12': ['12px', { lineHeight: '1', letterSpacing: '1.75px' }],
        '10': ['10px', { lineHeight: '1', letterSpacing: '1.75px' }],
      },
      spacing: {
        '100': '8px',
        '200': '16px',
        '300': '24px',
        '400': '32px',
        '600': '48px',
        '1500': '120px',
      },
      borderRadius: {
        '15': '15px',
      },
      boxShadow: {
        'figma': '0px 50px 50px -25px rgba(0,0,0,0.098)',
      },
    },
  },
  plugins: [],
} 