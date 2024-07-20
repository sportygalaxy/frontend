/** @type {import('next').NextConfig} */
const nextConfig = {
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
