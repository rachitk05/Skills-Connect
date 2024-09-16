import { nextui } from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        white: "#FFFFFF",
        black: "#000000",
      },
      backgroundImage: {
        'signup': "url('/img/signup.jpg')",
        'login': "url('/img/login.jpg')",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
