var express = require('express')
const categoryController = require('../controllers/categoryController')
const Router = express.Router()
//http://localhost:8080/category
Router.route('/')
  .get(categoryController.getAllCate)
  .post(categoryController.addNewCategory)

Router.route('/brand')
  .post(categoryController.addBrandsToCategory)

const categoryRouter = Router

module.exports = categoryRouter