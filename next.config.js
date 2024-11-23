module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'example.com', 'api.example.com'],
  },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  env: {
    BASE_URL: process.env.BASE_URL,
  }
}
