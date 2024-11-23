module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost',                     // Untuk pengembangan lokal
      'spotq.fwzdev.site',                   // Domain utama
      'innovative-desire-2e8cb3f5b1.strapiapp.com',               // API domain
      'innovative-desire-2e8cb3f5b1.media.strapiapp.com', // Domain media Strapi
    ],
  },
  env: {
    BASE_URL: process.env.BASE_URL,    // Menggunakan variabel lingkungan untuk API
  },
};
