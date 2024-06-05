const { default: mongoose } = require("mongoose");
const ApiError = require("../../utils/ApiError");
const { HttpStatusCode } = require("axios");
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const masterViewSchema = new Schema({
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

const MasterView = mongoose.models.masterView || mongoose.model('masterView', masterViewSchema);

const addMasterViews = async (data) => {
  const result = await Promise.allSettled(
    data.map(async (item) => {
      const {code} = item
      //check master code exists
      const MVexist = await MasterView.exists({ code })
      if (MVexist) {
        throw new ApiError(HttpStatusCode.Conflict, 'Master view is exist!')
      }

      //save master view
      const masterV = new MasterView(item)
      setTimeout(() => {
        masterV.save()
      }, 0);

      return masterV
    })
  )

  console.log(result);
  return result
}
const getMasterView = async (data) => {
  const { filter, projection } = data
  const mv = await MasterView.findOne(filter, projection)
  return mv
}
const getMasterViews = async (data) => {
  const { filter, projection } = data
  const mvs = await MasterView.find(filter, projection)
  return mvs
}

const masterView = {
  MasterView,

  addMasterViews,
  getMasterView,
  getMasterViews
}
module.exports = masterView