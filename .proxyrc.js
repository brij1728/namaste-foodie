const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // Proxy /dapi requests to Swiggy
  app.use(
    '/dapi',
    createProxyMiddleware({
      // target: 'http://localhost:21234/dapi',
      target: 'https://www.swiggy.com/dapi',
      changeOrigin: true,
      // Removed the pathRewrite option
    })
  );
};

