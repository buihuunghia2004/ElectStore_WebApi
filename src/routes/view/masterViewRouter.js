var express = require('express')
const masterViewController = require('../../controllers/view/masterViewController')
const Router = express.Router()
//http://localhost:8080/category
Router.route('/')
  .post(masterViewController.addViews)

const masterViewRouter = Router

module.exports = masterViewRouter