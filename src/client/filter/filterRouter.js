var express = require('express')
const Router = express.Router()

//http://localhost:8080/filter
Router.route('/')
  .get(productController.getProducts)

const filterRouter = Router

module.exports = filterRouter