const { HttpStatusCode } = require("axios")
const viewModel = require("../../models/view/view")
const successResponse = require('../../utils/successResponse')
const addView = async (req, res, next) => {
  try {
      const added = await viewModel.addView(req.body)
      res.status(HttpStatusCode.Ok).json(successResponse(added, 'Add view successful!'))
  } catch (error) {
    next(error)
  }
}
const addViews = async (req, res, next) => {
  try {
      const added = await viewModel.addViews(req.body)
      res.status(HttpStatusCode.Ok).json(successResponse(added, 'Add view successful!'))
  } catch (error) {
    next(error)
  }
}

const getViews = async (req,res, next) => {
  try {
    const result = await viewModel.getViews(req.body)
     res.status(HttpStatusCode.Ok).json(successResponse(result,'Get views brand phone successful!'))
  } catch (error) {
    next(error)
  }
}
const viewController = {
  addView,
  addViews,
  getViews
}
module.exports = viewController