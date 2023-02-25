const express = require('express');
const {registerUser,authUser} = require("../controllers/Con_controller");
const {getCart} = require("../controllers/cartController")
const router = express.Router();

console.log(`registerUser${registerUser}`)
router.post('/',registerUser);
router.post('/login',authUser)
router.post('/cart',getCart)

module.exports = router;