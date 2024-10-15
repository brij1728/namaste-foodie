const express = require('express');
const cors = require('cors'); // Import CORS middleware
const https = require('https'); // Import https for custom agent
const fetch = require('node-fetch'); // Node.js Fetch for external API requests

const app = express();
const port = 5000;

// Enable CORS for all requests
app.use(cors());

// Create an agent that disables SSL certificate verification for development only
const devAgent = new https.Agent({
  rejectUnauthorized: false, // Disable SSL verification in development
});

// Import routes
const restaurantRoutes = require('./routes/restaurantRoutes');
const menuRoutes = require('./routes/menuRoutes');

// Use routes
app.use('/api', restaurantRoutes);
app.use('/api', menuRoutes);

// Start the server
app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});
