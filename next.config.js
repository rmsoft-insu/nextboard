/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  env: {
    ACCESS_KEY: process.env.AWS_ACCESSKEY,
    SECRET_KEY: process.env.AWS_SECRET_ACCESSKEY,
    RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED: false,
  },
};

module.exports = nextConfig;
