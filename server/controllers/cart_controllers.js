const asyncHandler = require('express-async-handler');
const User = require('../models/ConsumerModel');
const Product = require('../models/productmodel');
const Cart = require('../models/cartmodel');

// create cart for a user
const createCart = asyncHandler(async (req, res) => {
  const { username, productName } = req.body;

  // find the user by username
  const user = await User.findOne({ username });

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // find the product by name
  const product = await Product.findOne({ name: productName });

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // create a new cart for the user
  const cart = new Cart({
    user: user._id,
    products: [{
      product: product._id,
      quantity: 1 // you can set the quantity as required
    }]
  });

  // save the cart to the database
  const savedCart = await cart.save();

  res.status(201).json(savedCart);
});
module.exports={createCart}
