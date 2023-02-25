const Cart = require('../models/cartSchema');

// Add an item to the cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });

    // If cart already exists, add the item to the cart
    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.productId === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
      await cart.save();
      return res.send('Item added to cart');
    }

    // If cart doesn't exist, create a new cart and add the item
    const newCart = new Cart({ user: req.user._id, items: [{ productId, quantity }] });
    await newCart.save();
    res.send('Item added to cart');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Get the current user's cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.productId');
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Remove an item from the cart
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(400).send('Cart not found');
    }

    const itemIndex = cart.items.findIndex(item => item.productId === productId);
    if (itemIndex > -1) {
      const item = cart.items[itemIndex];
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        cart.items.splice(itemIndex, 1);
      }
      await cart.save();
    }

    res.send('Item removed from cart');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

module.exports = { addToCart, getCart, removeFromCart };
