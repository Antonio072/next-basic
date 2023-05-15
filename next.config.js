/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.lorem.space', 'images.hola.com', 'placeimg.com'],
  },
}

module.exports = nextConfig
