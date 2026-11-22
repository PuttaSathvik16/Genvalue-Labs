/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gh: {
          bg: '#0d1117',
          surface: '#161b22',
          border: '#30363d',
          subtle: '#21262d',
          text: '#c9d1d9',
          heading: '#f0f6fc',
          muted: '#8b949e',
          blue: '#58a6ff',
          green: '#238636',
          purple: '#a371f7',
          yellow: '#d29922'
        }
      }
    },
  },
  plugins: [],
}
