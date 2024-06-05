const mongoose = require('mongoose');
const ApiError = require('../utils/ApiError');
const { StatusCodes } = require('http-status-codes');
const { date } = require('joi');
const { createVersion, addVersion, VersionProduct } = require('./versionProductModel');
const { BRAND_VIEW, CONFIG_INFO_VIEW, BRAND_VIEW_0, COLOR_VIEW } = require('../utils/viewConstant');
const { getCategoryByCode, getCategory, Category } = require('./categoryModel');
const { Brand } = require('./brandModel');
const { HttpStatusCode } = require('axios');
const { View } = require('./view/view');
const { MasterView } = require('./view/masterView');
const e = require('express');
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const ProductSchema = new Schema({
  productId: {
    type: ObjectId,
    required: true
  },
  productName: {
    type: String,
    required: true,
  },
  brand: {
    type: { _id: ObjectId, name: String },
    required: true
  },
  category: {
    type: { _id: ObjectId, name: String },
    required: true
  },
  versionName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true
  },
  models:[
    {
      name:String,
      quantity: {
        type: Number,
        required: true
      },
      imageDetails: {
        type: [String],
        required: true
      }
    }
  ],
  totalQuantity: {
    type: Number,
    required: true
  },
  importPrice: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  currentPrice: {
    type: Number,
    required: true
  },
  discountAmount: {
    type: Number,
    default: 0
  },
  configInfos: {
    type: [
      {
        title: String,
        detail: String,
      }
    ],
    required: true,
    _id: false
  },
  filterInfos: {
    type: [
      {
        code: String,
        value: Number,
        _id: false
      }
    ],
    required: true
  },
  sample: {
    type: Boolean,
    default: false
  },
  rate: {
    type: Number,
    default: 0
  },
  sold: {
    type: Number,
    default: 0
  },
  _isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true })

const Product = mongoose.models.product || mongoose.model('product', ProductSchema);

const addNewProduct = async (data) => {
  const { productName, brandId, categoryId, proConfigInfos, versions, proFilterInfos, proAttrs,image,mModels } = data

  //kiểm tra xem sản phẩm tồn tại chưa
  const findProduct = await Product.exists({ productName })
  if (findProduct) {
    throw new ApiError(StatusCodes.CONFLICT, 'Product is exists')
  }

  //Tìm tên thương hiệu
  const brand = await Brand.findById(brandId)
  if (!brand) {
    throw new ApiError(HttpStatusCode.NotFound, 'Not found', 'brandId: ' + brandId)
  }
  //Tìm tên loại
  const category = await Category.findById(categoryId)
  if (!category) {
    throw new ApiError(HttpStatusCode.NotFound, 'Not found', 'cateoryId: ' + brandId)
  }

  //Tạo bảng version và xử lý phần attrs
  let versionProduct = new VersionProduct({ attrs: [], versions: [] })
  const productId = versionProduct._id

  await Promise.all(
    proAttrs.map(async (item) => {
      const mtv = await MasterView.findOne({ code: item.attr })
      const attr = { code: item.attr, name: mtv.name }
      let values = []
      await Promise.all(item.values.map(async (i) => {
        const value = await View.findOne({ mCode: item.attr, code: i })
        values.push(value)
      }))
      versionProduct.attrs.push({ attr, values })
    })
  )

  await Promise.allSettled(versions.map(async (item, index) => {
    const { versionName, quantity, price, importPrice, imageDetails, vAttrs,models } = item

    //handle configInfo
    let vConfigInfos = []
    await Promise.all(
      vAttrs.map(async (item) => {
        const mv = await MasterView.findOne({code:item.code})
        const ci = {title:mv.name,detail:item.detail}
        vConfigInfos.push(ci)
      })
    )

    const productEx = await Product.exists({ versionName })
    if (productEx) {
      throw new ApiError(HttpStatusCode.Conflict, 'Product', 'Exitst')
    }

    let product = new Product({
      productId,
      productName,
      brand: { name: brand.name, _id: brand._id },
      category: { name: category.name, _id: category._id },
      versionName,
      quantity,
      price,
      currentPrice: price,
      importPrice,
      image,
      imageDetails
    })

    if (index == 0) {
      product.sample = true
    }

    let configInfos = [...proConfigInfos, ...vConfigInfos, { "title": "Hãng", "detail": brand.name }]
    let filterInfos = [...proFilterInfos, ...vAttrs]
    let pModels = []
    let totalQuantity = 0

    models.forEach( element => {
      pModels.push({...mModels[element.attr],quantity:element.quantity});
      totalQuantity += element.quantity
    });

    product.configInfos = configInfos
    product.filterInfos = filterInfos
    product.models = pModels
    product.totalQuantity = totalQuantity

    product.save()

    //xử lý phần versions
    const version = {
      productId: product._id,
      attrs: [...vAttrs]
    }
    versionProduct.versions.push(version)

    return product
  }))

  await versionProduct.save()

  return { status: true }
}

const getProducts = async () => {
  const products = await Product.find()
  return products
}
const importProduct = async (data) => {
  const { id, updateData } = data

  let product
  try {
    product = await Product.findById(id)

    if (!product) {
      throw new Error('error')
    }
  } catch (error) {
    throw new ApiError(404, 'Not found product')
  }


  updateData.forEach(element => {
    let fined = false
    product.attributes.forEach((attr, index) => {
      if (element.attrId.toString() == attr._id.toString()) {
        product.attributes[index].quantity += element.quantity
        fined = true
      }
    })

    if (!fined) {
      throw new ApiError(404, 'Not found attribute of product')
    }
  });

  product.save()

  return product
}
const updateQuantity = async (data) => {
  const { _id, attrId, quantity } = data

  let product
  try {
    product = await Product.findById(_id)

    if (!product) {
      throw new Error('error')
    }
  } catch (error) {
    throw new ApiError(404, 'Not found product')
  }

  let fined = false
  product.attributes.forEach((attr, index) => {
    if (attrId.toString() == attr._id.toString()) {
      product.attributes[index].quantity += quantity
      fined = true
    }
  })

  if (!fined) {
    throw new ApiError(404, 'Not found attribute of product')
  };

  product.save()

  return product
}

const productModel = {
  Product,

  addNewProduct,
  getProducts,
  importProduct
}
module.exports = productModel