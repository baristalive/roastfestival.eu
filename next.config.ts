import type { NextConfig } from 'next'

import createMDX from "@next/mdx";
import rehypeUnwrapImages from "rehype-unwrap-images";
import remarkGfm from "remark-gfm";
import remarkExtendedTable, {
  extendedTableHandlers,
} from "remark-extended-table";
import { RuleSetRule } from 'webpack';

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    rehypePlugins: [rehypeUnwrapImages],
    remarkPlugins: [remarkGfm, remarkExtendedTable],
    remarkRehypeOptions: { handlers: { ...extendedTableHandlers } },
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
  transpilePackages: ["next-image-export-optimizer"],
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule: RuleSetRule) =>
      rule.test instanceof RegExp && rule.test?.test?.(".svg"),
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        resourceQuery: /url/, // *.svg?url
        test: /\.svg$/i,
      },
      // Convert all other *.svg imports to React components
      {
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        test: /\.svg$/i,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: "preset-default",
                    params: {
                      overrides: {
                        cleanupIds: false,
                        removeViewBox: false,
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.md$/i,
        use: "raw-loader",
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default withMDX(nextConfig);
