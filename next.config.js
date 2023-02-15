/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'api.ts'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hips.hearstapps.com',
      },
      {
        protocol: 'https',
        hostname: 'image.tmdb.org'
      }
    ],
  },
}

module.exports = nextConfig
