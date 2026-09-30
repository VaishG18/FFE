import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Next 16 requires an explicit allowlist; 75 = default, 90 = hero photography.
    qualities: [75, 90],
  },
};

export default nextConfig;
