const mongoose = require('mongoose');
const ApiError = require('../utils/ApiError');
const { StatusCodes } = require('http-status-codes');
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const VersionProductSchema = new Schema({
  attrs: {
    type: [{
      attr: {
        code: String,
        name: String,
        _id: false
      },
      values: [
        {
          code: Number,
          name: String,
          _id: false
        }
      ],
      _id: false
    }],
    required: true
  },
  versions: {
    type: [{
      productId:ObjectId,
      attrs: [{ code: String, value: Number, _id: false }],
      _id: false 
    }]
  }
})

const VersionProduct = mongoose.models.versionProduct || mongoose.model('versionproduct', VersionProductSchema);

const createVersion = async (data) => {
  const { productId } = data

  console.log('+++++++++++++++++++');
  console.log(productId.toString(),'------------');
  //check version is exist
  // const versionFinded = await VersionProduct.exists({ productId:productId.toString() })
  // if (versionFinded) {
  //   throw new ApiError(StatusCodes.CONFLICT, 'Version đã tồn tại')
  // }
  //create new version
  // const version = new VersionProduct(data)
  // version.save()

  return versionFinded
}

const addVersion = async (data) => {
  const { productName, version } = data;
  console.log('Bắt đầu thêm phiên bản mới');

  try {
    const versionFinded = await VersionProduct.exists({ productName });
    if (!versionFinded) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Not found versionProduct');
    }

    // Add version to versions
    const updatedVersionProduct = await VersionProduct.findOneAndUpdate(
      { productName },
      { $push: { versions: version } },
      { new: true }
    );
    return true;
  } catch (error) {
    console.error('Lỗi khi thêm phiên bản:', error);
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error adding version');
  }
};


const VersionProductModel = {
  VersionProduct,

  createVersion,
  addVersion,
}

module.exports = VersionProductModel