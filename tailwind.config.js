/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/login/reg/registration.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/login/reg/src/**/*.{js,ts,jsx,tsx}",
    "./src/login/pswrd_reset/src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}