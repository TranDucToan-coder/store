const express = require('express');
const route = express.Router();
const CategoryController = require('../Controller/ControllerCategories');

route.get('/', CategoryController.getItem);
route.get('/:id', CategoryController.getDetailItem);
route.put('/updateItem/:id', CategoryController.updateItem);
route.post('/insertItem', CategoryController.insertItem);
route.delete('/deleteItem/:id', CategoryController.deleteItem);

module.exports = route;