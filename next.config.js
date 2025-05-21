/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
      experimental: {
        serverComponentsExternalPackages: ['@react-email/components']
      },
      compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
      }
}

module.exports = nextConfig
