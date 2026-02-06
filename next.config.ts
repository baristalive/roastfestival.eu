import type { NextConfig } from "next";

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

export default withMDX(nextConfig);
