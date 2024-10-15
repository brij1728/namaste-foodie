const express = require('express');
const { fetchRestaurantMenu } = require('../controllers/menuController');

const router = express.Router();

// API route to fetch restaurant menu data
router.get('/restaurantMenu', fetchRestaurantMenu);

module.exports = router;
