/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [{ hostname: 'image.tmdb.org' }],
  },
};

module.exports = nextConfig;
