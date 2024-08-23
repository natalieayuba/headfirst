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
        hostname: 'dice-media.imgix.net',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '**.pexels.com',
        port: '',
      },
      {
        protocol: 'http',
        hostname: 'dummyimage.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;
