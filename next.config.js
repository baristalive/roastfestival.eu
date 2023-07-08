/** @type {import('next').NextConfig} */

// trim off `<owner>/`
const repo = (process.env.GITHUB_REPOSITORY || "").replace(/.*?\//, "");

const nextConfig = {
  output: "export",
  ...(process.env.GITHUB_ACTIONS && {
    basePath: `/${repo}`,
  })
};

module.exports = nextConfig
