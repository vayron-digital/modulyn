/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better performance
  reactStrictMode: true,
  // Enable SWC minification for faster builds
  swcMinify: true,
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Enable experimental features for better performance
  experimental: {
    // Enable optimistic updates
    optimisticClientCache: true,
  },
}

module.exports = nextConfig