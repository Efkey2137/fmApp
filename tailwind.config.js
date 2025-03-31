/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark': {
          DEFAULT: '#151515',
          secondary: '#1b1b1b',
          tertiary: '#222031',
        },
        'accent': {
          DEFAULT: '#9a66ff',
          hover: '#a375ff',
        },
        'primary': {
          DEFAULT: '#9a66ff',
          hover: '#7a50cc',
        },
        primary: '#9a66ff',
        'bg-dark': '#1b1b1b',
        'bg-darker': '#151515',
        'text-light': '#e0e0e0',
        'border-color': '#393046',
        rating: {
          gold: '#ffd700',
          green: '#4caf50',
          blue: '#2196f3',
          orange: '#ff9800',
          yellow: '#ffeb3b',
          red: '#f44336',
          purple: '#9c27b0',
        }
      },
      backgroundImage: {
        'gradient-custom': 'linear-gradient(145deg, var(--bg-dark), var(--bg-darker))',
      },
    }
  },
  plugins: [],
}
