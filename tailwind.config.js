/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          400: "#969798",
          500: "#666666",
          700: "#353535",
          800: "#262626",
          900: "#171818",
        }
      },
      transitionProperty: {
        "width": "width",
        "height": "height",
        "max-height": "max-height",
        "spacing": "margin, padding",
      },
      transitionDelay: {
        '0': '0ms',
        '50': '50ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
        '350': '350ms',
        '400': '400ms',
        '450': '450ms',
        '500': '500ms',
        '550': '550ms',
        '600': '600ms',
        '650': '650ms',
        '700': '700ms',
        '750': '750ms',
        '800': '800ms',
        '850': '850ms',
        '900': '900ms',
        '950': '950ms',
        '1000': '1000ms',
      },
      transitionDuration: {
        '0': '0ms',
        '50': '50ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
        '350': '350ms',
        '400': '400ms',
        '450': '450ms',
        '500': '500ms',
        '550': '550ms',
        '600': '600ms',
        '650': '650ms',
        '700': '700ms',
        '750': '750ms',
        '800': '800ms',
        '850': '850ms',
        '900': '900ms',
        '950': '950ms',
        '1000': '1000ms',
      }
    },
  },
  plugins: [],
}
