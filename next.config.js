const withPlugins = require("next-compose-plugins");
const withOptimizedImages = require("next-optimized-images");

// next.js configuration
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/grocery",
        permanent: false,
      },
    ];
  },
  webpack: (config) => {
    config.node = {
      fs: "empty",
      child_process: "empty",
      net: "empty",
      tls: "empty",
    };
    return config;
  },
};

module.exports = withPlugins([withOptimizedImages], nextConfig);
