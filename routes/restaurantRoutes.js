const express = require('express');
const { fetchRestaurants } = require('../controllers/restaurantController');

const router = express.Router();

// API route to fetch restaurant data
router.get('/restaurants', fetchRestaurants);

module.exports = router;
