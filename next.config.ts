import type { NextConfig } from "next";

import { withSentryConfig } from "@sentry/nextjs";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  extension: /\.(md|mdx)$/,
  options: {
    rehypePlugins: ["rehype-unwrap-images"],
    remarkPlugins: [["remark-gfm"]],
  },
});

const nextConfig: NextConfig = {
  env: {
    nextImageExportOptimizer_exportFolderName: "optimized",
    nextImageExportOptimizer_exportFolderPath: "out",
    // If you do not want to use blurry placeholder images, then you can set
    // nextImageExportOptimizer_generateAndUseBlurImages to false and pass
    // `placeholder="empty"` to all <ExportedImage> components.
    nextImageExportOptimizer_generateAndUseBlurImages: "true",
    nextImageExportOptimizer_imageFolderPath: "public/images",
    nextImageExportOptimizer_quality: "90",

    // If you want to cache the remote images, you can set the time to live of the cache in seconds.
    // The default value is 0 seconds.
    nextImageExportOptimizer_remoteImageCacheTTL: "0",

    nextImageExportOptimizer_storePicturesInWEBP: "true",
  },
  images: {
    deviceSizes: [640, 750, 828, 1080],
    imageSizes: [256, 384],
    loader: "custom",
  },
  output: "export",
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  transpilePackages: ["next-image-export-optimizer"],
};

export default withSentryConfig(withMDX(nextConfig), {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: process.env.NEXT_PUBLIC_SENTRY_ORG,

  project: process.env.NEXT_PUBLIC_SENTRY_PROJECT,

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  webpack: {
    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  },

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,
});
