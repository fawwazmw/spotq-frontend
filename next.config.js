module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost', // For local development
      'spotq.fwzdev.site', // Primary domain
      'innovative-desire-2e8cb3f5b1.strapiapp.com', // API domain
      'innovative-desire-2e8cb3f5b1.media.strapiapp.com', // Strapi media domain
    ],
  },
  env: {
    BASE_URL: process.env.BASE_URL || 'http://localhost:1337', // Fallback for development
  },
};
