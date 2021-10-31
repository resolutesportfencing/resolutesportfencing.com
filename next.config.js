module.exports = {
  images: {
    loader: 'cloudinary',
    domains: ['vercel.app', 'resolutesportfencing.com'],
  },
  trailingSlash: false,
  async exportPathMap(defaultPathMap) {
    return {
      '/': { page: 'index' },
    };
  }
}