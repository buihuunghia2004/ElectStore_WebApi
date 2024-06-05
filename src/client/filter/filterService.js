const { HttpStatusCode } = require("axios")
const { Category } = require("../../models/categoryModel")
const ApiError = require("../../utils/ApiError")

const getFilterByCateId =async (id) => {
  const category = await Category.findById(id)
  if (!cateExists) {
    throw new ApiError(HttpStatusCode.NotFound,'Not found category',''+id)
  }

  return category.filterList
}

const filterService = {}
module.exports = filterService