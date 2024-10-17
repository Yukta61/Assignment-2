const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');


router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products', productController.addProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.removeProduct);
router.delete('/products', productController.removeAllProducts);
router.get('/products', productController.findProductsByName); 
module.exports = router;
