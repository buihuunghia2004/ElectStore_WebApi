const mongoose = require("mongoose");
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const ApiError = require("../utils/ApiError");
const { StatusCodes } = require("http-status-codes");

//model
const { User } = require("./userModel");
const { Product } = require("./productModel");

const addToCart = async (data) => {
  const {userId, productId, attrId, quantity} = data
  let user
  let product

  //check user exist
  user = await User.findById(userId)
  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND,'Not found user')
  }

  //check product exist
  product = await Product.findById(productId)
  if (!product) {
    throw new ApiError(StatusCodes.NOT_FOUND,'Not found product')
  }

  //check attribute
  let attrCartIndex = user.cart.findIndex((item) => {
    return item.attrId.toString() === attrId
  })

  //if increase
  if (quantity > 0) {
    //check quanity of product >= quantity of cart
    const attProduct = product.attributes.find((attribute)=>{
      return attribute._id.toString() === attrId
    })

    if (attProduct.quantity < quantity) {
      throw new ApiError(405,'Quantity require must be smaller quantity product')
    }

    //handle increase quantity product
    if (attrCartIndex != -1) {
      user.cart[attrCartIndex].quantity += quantity
    }else{
      user.cart.push(
        {
          productId,
          attrId,
          quantity
        }
      )
    }
    
  }else{ //if decrease
    //check product quantity > 1
    if (user.cart[attrCartIndex].quantity < 1) {
      throw new ApiError(405,'Not do decrease')
    }
    //handle decrease quantity product
    user.cart[attrCartIndex].quantity -= 1
  }

  //save user
  user.save()

  return user
}

const cartModel = {
  addToCart
}

module.exports = cartModel