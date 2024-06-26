var express = require('express');
const userController  = require('../controllers/userController');
const cartController  = require('../controllers/cartController');
const userValidation = require('../validations/userValidation');
var Router = express.Router();

Router.route('/:id/cart')
  .put(cartController.addToCart)

/* GET users listing. */
Router.post('/register',userValidation.register,userController.register);
Router.post('/login',userValidation.login, userController.login);

const userRouter = Router
module.exports = userRouter;