const { json } = require("body-parser")
const categoryModel = require("../models/categoryModel")
const { StatusCodes } = require("http-status-codes")
const successResponse = require("../utils/successResponse")

const addNewCategory = async (req, res, next) => {
  try {
    const added = await categoryModel.addNewCategory(req.body)

    res.status(StatusCodes.OK).json(successResponse(added,'Add category successful!'))
  } catch (error) {
    next(error)
  }
}

const addBrandsToCategory = async (req, res, next) => {
  try {
    const added = await categoryModel.addBrandsToCategory(req.body)

    res.status(StatusCodes.OK).json(successResponse(added,'Add brands to category successful!'))
  } catch (error) {
    next(error)
  }
}

const getAllCate = async (req, res, next) => {
  try {
    const result = await categoryModel.getAllCate()

    res.status(StatusCodes.OK).json(successResponse(result,'Get category successful!'))
  } catch (error) {
    next(error)
  }
}

const categoryController = {
  addNewCategory,
  addBrandsToCategory,
  getAllCate
}
module.exports = categoryController