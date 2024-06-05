const mongoose = require('mongoose');
const ApiError = require('../utils/ApiError');
const { StatusCodes } = require('http-status-codes');
const { date } = require('joi');
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const ClassifySchema = new Schema({
  productId:{
    type:String,
    required:true
  },
  classifyGroup:{
    type:[{
      title:String,
      values:[String]
    }],
    required:true
  }
})

const Classify = mongoose.models.classify || mongoose.model('classify', ClassifySchema);



const classifyModel = {
  Classify
}
module.exports = classifyModel