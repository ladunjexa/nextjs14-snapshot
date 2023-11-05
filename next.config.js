/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cloud.appwrite.io',
      },
      {
        protocol: 'http',
        hostname: 'cloud.appwrite.io',
      },
    ],
  },
};

module.exports = nextConfig;
