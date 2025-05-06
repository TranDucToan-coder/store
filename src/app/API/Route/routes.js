const express = require('express');
const route = express.Router();
const ProductController = require('../Controller/ControllerProduct');

route.get('/', ProductController.getProduct);
route.get('/:id', ProductController.getDetailProduct);
route.post('/insertProduct', ProductController.insertProduct);
route.put('/updateProduct/:id', ProductController.updateProduct);
route.delete('/deleteProduct/:id', ProductController.deleteProduct);

module.exports = route;
