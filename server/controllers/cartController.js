const asyncHandler = require('express-async-handler');
const getCart = require('../models/cart');

const getCart = asyncHandler(async (req, res) => {
  const cart = await getCart.findOne({ user: req.user._id }).populate('items.productId');
  if (cart) {
    res.json(cart);
  } else {
    res.json({ items: [] });
  }
});

module.exports = { getCart };
