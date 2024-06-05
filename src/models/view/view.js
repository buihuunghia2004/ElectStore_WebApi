const { default: mongoose } = require("mongoose");
const { MasterView } = require("./masterView");
const ApiError = require("../../utils/ApiError");
const { HttpStatusCode } = require("axios");
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const viewSchema = new Schema({
  code: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  mCode: {
    type: String,
    required: true
  },
  refMC: {
    type: String,
    default: null
  }
})

const View = mongoose.model('view',viewSchema)
// const View = mongoose.models.view || mongoose.model('view', viewSchema);

const addView = async (data) => {
  const { code, name, mCode, refMC } = data
  //check exists master view
  const existsMasterView = await MasterView.exists({ code: mCode })
  if (!existMasterView) {
    throw new ApiError(HttpStatusCode.NotFound, 'Not found Master View')
  }

  //check view exists
  const existsView = await View.exists({ code, mCode })
  if (existsView) {
    throw new ApiError(HttpStatusCode.Conflict, 'View is exists')
  }

  //add view
  const view = new View(data)
  setTimeout(() => {
    view.save()
  }, 0);

  return view
}
const addViews = async (data) => {
  const result = await Promise.allSettled(
    data.map(async (item) => {
      const {code, mCode} = item
      //check exists master view
      const existsMasterView = await MasterView.exists({ code: mCode })
      if (!existsMasterView) {
        throw new ApiError(HttpStatusCode.NotFound, 'Not found Master View')
      }

      //check view exists
      const existsView = await View.exists({ code, mCode })
      if (existsView) {
        throw new ApiError(HttpStatusCode.Conflict, 'View is exists')
      }

      //add view
      const view = new View(item)
      setTimeout(() => {
        view.save()
      }, 0)
    })
  )

  return result
}

const getView = async (data) => {
  const { filter, projection } = data
  const result = await View.findOne(filter, projection)
  return result
}
const getViews = async (data) => {
  const { filter, projection } = data
  const result = await View.find(filter, projection)
  return result
}


const viewModel = {
  View,

  addView,
  addViews,
  getView,
  getViews
}
module.exports = viewModel