/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    INFURA_API_KEY: process.env.INFURA_API_KEY,
    ANKR_API_KEY: process.env.ANKR_API_KEY,
    ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY,
  }
};

module.exports = nextConfig;
