import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow Sanity-hosted images (article mainImage, etc.) through next/image.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/jy3bnomi/**",
      },
    ],
  },
};

export default nextConfig;
