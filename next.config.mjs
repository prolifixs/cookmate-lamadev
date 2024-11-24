/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com'
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/a/**'
      },
      {
        protocol: 'https',
        hostname: 'placeholder.com'
      },
      {
        protocol: 'https',
        hostname: 'your-other-domains.com'
      }
    ]
  }
};

export default nextConfig;
