module.exports = {
  plugins: {
    autoprefixer: {},
    "@tailwindcss/postcss": {},
    ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
  },
};
