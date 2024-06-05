const userModel = require("../models/userModel")

const register = async (req, res, next) => {
  try{
    const registered = await userModel.register(req.body)

    res.status(200).json(registered)
  }catch(error){
    next(error)
  }
}

const login = async (req, res, next) => {
  try{
    const loged = await userModel.login(req.body)

    

    res.status(200).json({
      status:true,
      data:loged
    })
  }catch(error){
    next(error)
  }
}

 

const userController = {
  register, login
}

module.exports = userController