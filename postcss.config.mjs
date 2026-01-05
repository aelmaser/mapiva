/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // Burayı değiştirdik
    autoprefixer: {},
  },
};

export default config;