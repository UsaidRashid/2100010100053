const express = require('express');
const router = express.Router();

const productController = require('../controllers/products');

router.get('/categories/products', productController.getTopProducts);

module.exports = router;
