const { default: mongoose } = require("mongoose")
const ApiError = require("../utils/ApiError")
const { StatusCodes } = require("http-status-codes")
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const { BRAND_VIEW, CONFIG_INFO_VIEW } = require('../utils/viewConstant')
const { Brand } = require("./brandModel")
const { HttpStatusCode } = require("axios")
const { MasterView } = require("./view/masterView")
const { View } = require("./view/view")
const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image:{
    type:String,
    required:true
  },
  filterList:{
    type:[{code:String,name:String,values:[{code:Number, name:String,_id:false}],_id:false}],
    required:true
  },
  brandList:{
    type:[{_id: ObjectId, name:String, image:String,_id:false}],
    default:[]
  }
})

const Category = mongoose.models.category || mongoose.model('category', CategorySchema)

const addNewCategory = async (data) => {
  let { name, filterList } = data
  const category = await Category.exists({ name })

  if (category) {
    throw new ApiError(StatusCodes.CONFLICT,'Add new category fail', 'Category is exist')
  }

  await Promise.all(filterList.map(async (item,index) => {
    const mtv = await MasterView.findOne({code:item.code})
    await Promise.all(item.values.map(async (it,id)=> {
      const v = await View.findOne({mCode:item.code,code:it})
      filterList[index].values[id] = {code:it,name:v.name}
    }))
    filterList[index].name = mtv.name
  }))

  const newCategory = new Category(data)
  await newCategory.save()

  return data
}
const addBrandsToCategory = async(data) => {
  const {id, brandIds} = data
  const category = await Category.findById(data.id)
  if (!category) {
    throw new ApiError(HttpStatusCode.NotFound,'Not found',id+'')
  }
  await Promise.allSettled( brandIds.map(async (item) => {
    const brand = await Brand.findById(item)
    category.brandList.push(brand)
    return brand
  }))

  category.save()
  
  return {}
}
const getCategory = async (filter,injection) => {
  const category = await Category.findOne(filter||{},injection||{})
  if (!category) {
    throw new ApiError(StatusCodes.NOT_FOUND,'Not found category')
  }
  return category
}

const getAllCate = async () => {
  const category = await Category.find()
  if (!category) {
    throw new ApiError(StatusCodes.NOT_FOUND,'Get category faile','Not found category')
  }
  return category
}

const categoryModel = {
  Category,

  addNewCategory,
  addBrandsToCategory,
  getAllCate
}
module.exports = categoryModel