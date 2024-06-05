const { StatusCodes } = require("http-status-codes");
const Joi = require("joi");
const { STRING, ARRAY_OBJECT } = require("../utils/validatorConstant");


const addNewProduct = async (req, res, next) => {
  try {
    const correctCondition = Joi.object({
      name:STRING,
      brand:STRING,
    })
    await correctCondition.validateAsync(req.body)
    next()
  } catch (error) {
    console.log(error);
    res.status(405).json({message:error.message})
  }
}

const productValidation = {
  addNewProduct
}
module.exports = productValidation


// const addNewProduct = async (req, res, next) => {
//   try {
//     const correctCondition = Joi.object({})
//     correctCondition.validateAsync(req.body)
//     next()
//   } catch (error) {
//     console.log(error);
//     res.status(405).json({message:error.message})
//   }
// }