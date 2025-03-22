/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['*'], // This is insecure - you should specify actual domains
    // Alternative approach with remotePatterns for more security:
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    unoptimized: true, // For Netlify static deployment
  },
}

module.exports = nextConfig
