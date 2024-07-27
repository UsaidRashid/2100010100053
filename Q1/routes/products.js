const express = require('express');
const router = express.Router();

const productController = require('../controllers/products');

router.get('/categories/:categoryname/products', productController.getTopProducts);

module.exports = router;
