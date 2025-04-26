/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**headfirstbristol.co.uk',
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
      {
        protocol: 'https',
        hostname: 'images.squarespace-cdn.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'media.timeout.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'exchangebristol.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'i2-prod.bristolpost.co.uk',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'static.ra.co',
        port: '',
      },
    ],
  },
};

export default nextConfig;
