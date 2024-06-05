const cartModel = require("../models/cartModel")

const addToCart = async(req, res, next) => {
  const userId = req.params.id
  const data = {...req.body,userId}
  try {
    const added = await cartModel.addToCart(data)

    res.status(200).json({
      status:true,
      data:added,
      message:"Thêm sản phẩm thành công"
    })
  } catch (error) {
    next(error)
  }
}

const cartController = {
  addToCart
}

module.exports = cartController