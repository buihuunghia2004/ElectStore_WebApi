const { HttpStatusCode } = require("axios")
const brandModel = require("../models/brandModel")
const successResponse = require("../utils/successResponse")

const addBrands = async (req, res, next) => {
  try {
    const result = await brandModel.addBrands(req.body)
    res.status(HttpStatusCode.Ok).json(successResponse(result, 'Add brands successful'))
  } catch (error) {
    next(error)
  }
}

const brandController = {
  addBrands
}
module.exports = brandController