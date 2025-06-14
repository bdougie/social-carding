/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Don't stop the build when there are ESLint errors 
    // in production - only show warnings
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['*'], // This is insecure - you should specify actual domains
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
  experimental: {
    serverComponentsExternalPackages: ['cheerio'],
  },
}

module.exports = nextConfig