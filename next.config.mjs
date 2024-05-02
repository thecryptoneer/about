/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.styng.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.rareboard.com",
        port: "",
        pathname: "/assets/**",
      },
      {
        protocol: "https",
        hostname: "humxn.xyz",
        port: "",
        pathname: "/**",
      },
    ],
  },
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default nextConfig;
