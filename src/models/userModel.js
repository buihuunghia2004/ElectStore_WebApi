// (_id, email, password, name, role, carts, createdAt, updatedAt, available)
const mongoose = require('mongoose');
const ApiError = require('../utils/ApiError');
const { StatusCodes } = require('http-status-codes');
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId


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
  const {email} = data

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

  //create user
  const user = new User(data)
  await user.save()

  return user
}
const login = async (data) => {
  const {email, password} = data

  const user = await findUserByEmail(email)

  if (user.password != password) {
    throw new ApiError(405,'Wrong password')
  }

  return true
}

const userModel = {
  register, login
}

module.exports = userModel
