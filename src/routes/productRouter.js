var express = require('express')
const productController = require('../controllers/productController')
const productValidation = require('../validations/productValidation')
const Router = express.Router()

//http://localhost:8080/product
Router.route('/')
  .get(productController.getProducts)
  .post(productController.addNewProduct)

Router.route('/:id')
  .put(productController.importProduct)  
  
const productRouter = Router

module.exports = productRouter