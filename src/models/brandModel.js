const { default: mongoose } = require("mongoose");
const ApiError = require("../utils/ApiError");
const { HttpStatusCode } = require("axios");
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const BrandSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  image:{
    type:String,
    required:true
  }
})

const Brand = mongoose.models.brand || mongoose.model('brand', BrandSchema)

const addBrands = async(data) => {
  await Promise.allSettled(
    data.map(async (item) => {
      const exitsBrand = await Brand.exists({name:item.name})
      if (exitsBrand) {
        throw new ApiError(HttpStatusCode.Conflict,'Brand is exists')
      }
      const brand = new Brand(item)
      await brand.save()
  }))

  return {}
}

const brandModel = {
  Brand,

  addBrands
}
module.exports = brandModel