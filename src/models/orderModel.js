const mongoose = require("mongoose");
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const ApiError = require("../utils/ApiError");
const { StatusCodes } = require("http-status-codes");

const OrderSchema = new Schema({
  items:{
    type:[{
      productId:ObjectId,
      productName:String,
      price:Number
    }]
  },

  totalPrice:Number
})

const Order = mongoose.models.user || mongoose.model('order', OrderSchema);

const orderModel = {
}

module.exports = orderModel