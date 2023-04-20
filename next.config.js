/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: {
      displayName: true,
      ssr: true,
    },
  },
  env: {
    ACCESS_KEY: process.env.AWS_ACCESSKEY,
    SECRET_KEY: process.env.AWS_SECRET_ACCESSKEY,
  },
  images: {
    domains: ["images.unsplash.com", "ca-times.brightspotcdn.com"],
  },
};

module.exports = nextConfig;
