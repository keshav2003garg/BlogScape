module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        josefin: "'Josefin Sans', sans-serif",
        lora: "'Lora', serif",
        varela: "'Varela', sans-serif",
        varelaRound: "'Varela Round', sans-serif",
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
