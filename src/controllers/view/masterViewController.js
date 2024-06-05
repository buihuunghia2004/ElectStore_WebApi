const { HttpStatusCode } = require("axios")
const successResponse = require('../../utils/successResponse')
const masterView = require("../../models/view/masterView")
const addViews = async (req, res, next) => {
  try {
      const added = await masterView.addMasterViews(req.body)
      res.status(HttpStatusCode.Ok).json(successResponse(added, 'Add view successful!'))
  } catch (error) {
    next(error)
  } 
}
const masterViewController = {
  addViews
}
module.exports = masterViewController