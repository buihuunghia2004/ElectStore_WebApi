// (_id, email, password, name, role, carts, createdAt, updatedAt, available)
const mongoose = require('mongoose');
const ApiError = require('../utils/ApiError');
const { StatusCodes } = require('http-status-codes');
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
var bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const environment = require('../config/environment')

const UserSchema = new Schema({
  userName:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true,
    min:6,
  },
  cart:{
    type:[
      {
        productId:ObjectId,
        productname:String,
        price:Number,
        image:String,
        quantity:Number
      }
    ],
    default:[]
  }
})

const User = mongoose.models.user || mongoose.model('user', UserSchema);

const findUserByEmail = async (email) => {
  const user = await User.findOne({email})

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND,'Not found user')
  }

  return user
}

//login and register
const register = async (data) => {
  const {email, password} = data

  //check user exist
  try {
    await findUserByEmail(email)

    throw new ApiError(405,'Email is use')
  } catch (error) {
    //if finded user throw error 'Email is use'
    if (error.statusCode != StatusCodes.NOT_FOUND) {
      throw error
    }
  }

  bcrypt.genSalt(10,(err, salt) => {
    bcrypt.hash(password, salt,async (err, hash) => {
      data.password = hash
      const user = new User(data)
      await user.save()
    })
  })
  //create user

  return {status:true}
}

const login = async (data) => {
  const {email, password} = data

  const user = await findUserByEmail(email)

  if (!bcrypt.compareSync(password, user.password)) {
    throw new ApiError(405,'Wrong password')
  }

  const token = jwt.sign({email:email},environment.SECRET_KEY,{expiresIn:'1y'})
  const result = {...user._doc}
  delete result.password
  result.token = token

  return result
}
const userModel = {
  User,
  register, login,
}

module.exports = userModel


