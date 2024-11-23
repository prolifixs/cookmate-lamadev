/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com'
      }
    ],
    domains: [
      'lh3.googleusercontent.com',
      'placeholder.com',
      'your-other-domains.com'
    ]
  }
};

export default nextConfig;
