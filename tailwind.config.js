import scrollbar from 'tailwind-scrollbar'; // Import the scrollbar plugin

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",  // Assuming index.html is in the root
    "./src/**/*.{js,ts,jsx,tsx}",  // Adjust if needed
  ],
  theme: {
    extend: {},
  },
  plugins: [
    scrollbar,
  ],

}
