/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }
    return config;
  },
  experimental: {
    serverActions: true,
    reactRoot: true,
  },
};

module.exports = nextConfig;
