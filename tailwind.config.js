// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'dark-100': '#1a1a1a',
        'light-100': '#f5f5f5',
      },
    },
  },
  plugins: [],
}