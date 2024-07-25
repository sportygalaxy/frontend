/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  transpilePackages: ["lucide-react"],
  images: {
    remotePatterns: [
      {
        // protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        // protocol: "https",
        hostname: "s3-alpha-sig.figma.com",
      },
      {
        // protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
