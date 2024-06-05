var express = require('express')
const brandController = require('../controllers/brandController')
const Router = express.Router()
//http://localhost:8080/category
Router.route('/')
  .post(brandController.addBrands)

const brandRouter = Router

module.exports = brandRouter