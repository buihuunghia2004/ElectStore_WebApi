const productModel = require("../models/productModel")
const { HttpStatusCode } = require("axios")
const successResponse = require("../utils/successResponse")

const addNewProduct = async (req, res, next) => {
  try {
    const added = await productModel.addNewProduct(req.body)

    res.status(200).json(added)
  } catch (error) {
    next(error)
  }
}
const getProducts = async (req,res, next) => {
  try {
    const products = await productModel.getProducts()
    res.status(HttpStatusCode.Ok).json(successResponse(products,'Get products success'))
  } catch (error) {
    next(error)
  }
}

const importProduct = async (req, res, next) => {
  try {
    const data = {...req.body,id:req.params.id}
    const imported = await productModel.importProduct(data)

    res.status(200).json(imported)
  } catch (error) {
    next(error)
  }
}

const productController = {
  addNewProduct,
  getProducts,
  importProduct,
}

module.exports = productController