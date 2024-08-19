/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
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
    ],
  },
};

export default nextConfig;
