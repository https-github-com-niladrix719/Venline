const express = require('express');
const router = express.Router();
const {createSeller,authseller} = require('../controllers/sellercontroller');
const{ createProduct}=require('../controllers/productcontroller')

// Create a new seller
router.post('/seller', createSeller);
//authenticate seller
router.post('/seller/login', authseller);
//uploading product
router.post('/seller/upload', createProduct);

module.exports = router;
