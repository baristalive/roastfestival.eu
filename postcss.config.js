// trim off `<owner>/`
const repo = (process.env.GITHUB_REPOSITORY || "").replace(/.*?\//, "");

module.exports = {
  plugins: {
    "postcss-url": {
      url: ({ url }) =>
        url[0] === "/" && process.env.GITHUB_ACTIONS ? `/${repo}/${url}` : url,
    },
    tailwindcss: {},
    autoprefixer: {},
  },
};
