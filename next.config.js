module.exports = {
  images: {
    loader: 'cloudinary',
    domains: ['vercel.app', 'resolutesportfencing.com'],
  },
  trailingSlash: true,
  async exportPathMap(defaultPathMap) {
    return {
      '/': { page: 'index' },
    };
  }
}