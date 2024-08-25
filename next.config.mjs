/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'headfirstbristol.co.uk',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/photo-**',
      },
      {
        protocol: 'https',
        hostname: '**.pexels.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '**.youtube.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
