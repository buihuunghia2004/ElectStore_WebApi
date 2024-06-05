var express = require('express')
const viewController = require('../../controllers/view/viewController')
const Router = express.Router()
//http://localhost:8080/category
Router.route('/')
  .get(viewController.getViews)
  .post(viewController.addViews)

const viewRouter = Router

module.exports = viewRouter