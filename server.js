const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const isDevelopment = process.env.NODE_ENV !== 'production';

const app = express();

// Log all requests to track if /api requests are hitting correctly
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Proxy API requests to Swiggy
app.use(
  '/api',
  createProxyMiddleware({
    target: 'https://www.swiggy.com', // Swiggy API base URL
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/dapi/restaurants/list/v5', // Rewrite "/api" to the Swiggy API path
    },
    onError: (err, req, res) => {
      console.error('Proxy error:', err);
      res.status(500).send('Proxy error');
    },
    onProxyRes: (proxyRes, req, res) => {
      let data = '';
      proxyRes.on('data', (chunk) => {
        data += chunk;
      });
      proxyRes.on('end', () => {
        console.log('Response from Swiggy:', data); // Log Swiggy's response
      });
    },
  })
);

// Serve static files in production mode
if (!isDevelopment) {
  app.use(express.static(path.join(__dirname, 'dist')));

  // Serve index.html for any unmatched routes in production
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
