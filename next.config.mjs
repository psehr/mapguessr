/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.ppy.sh",
        port: "",
        pathname: "/beatmaps/**",
      },
    ],
  },
};

export default nextConfig;
