const withImages = require('next-images');
const withSvgr = require("next-svgr");

module.exports = withImages(withSvgr({
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/home",
      },
    ];
  },
}));
