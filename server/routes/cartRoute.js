const express = require('express');
const router = express.Router();
const { getCart } = require('../controllers/cartController');

router.get('/cart',  getCart);

module.exports = router;
