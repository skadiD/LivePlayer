// this function handles the opacity of color
function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `hsl(var(${variable}))`
    }
    return `hsl(var(${variable}) / ${opacityValue})`
  }
}
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'card': withOpacityValue('--c'),
        'title': withOpacityValue('--t')
      }
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    darkTheme: "halloween",
    themes: [{
      cmyk: {
        ...require("daisyui/src/colors/themes")["[data-theme=cmyk]"],
        info: '#718DF4',
        '--c': '212 96% 78%',
        '--t': '262 83% 58%',
      }},{
      halloween: {
        ...require("daisyui/src/colors/themes")["[data-theme=halloween]"],
        '--c': '215 14% 34%',
        '--t': '25 95% 53%'
      }}
    ],
  },
}
