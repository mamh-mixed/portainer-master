const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{html,tsx}'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',

      ...Object.fromEntries(
        [
          'white',
          'black',
          'blue-1',
          'blue-2',
          'blue-3',
          'blue-4',
          'blue-5',
          'blue-6',
          'blue-7',
          'blue-8',
          'red-1',
          'red-2',
          'green-1',
          'yellow-1',
          'grey-1',
          'grey-2',
          'grey-3',
          'grey-4',
          'grey-5',
          'grey-6',
          'grey-7',
          'grey-8',
        ].map((color) => [color, `rgb(var(--ui-${color}-base) / <alpha-value>)`])
      ),
    },
  },

  plugins: [
    plugin(({ addVariant }) => {
      addVariant('be', '[data-edition="BE"] &');
      addVariant('th-highcontrast', '[theme="highcontrast"] &');
      addVariant('th-dark', '[theme="dark"] &');
    }),
  ],
};
