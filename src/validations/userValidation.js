const Joi = require("joi")
const { EMAIL,STRING, PASSWORD } = require("../utils/validatorConstant")

const register = async (req, res, next) => {
  const dataValid = req.body
  const correctCondition = Joi.object({
    userName: STRING.strict(),
    email: EMAIL.strict(),
    password: PASSWORD.strict()
  })

  try {
    await correctCondition.validateAsync(dataValid, {abortEarly:false})

    next()
  } catch (error) {
    res.status(444).json({
      message:error.message
    })
  }
}
const login = async (req, res, next) => {
  const dataValid = req.body
  const correctCondition = Joi.object({
    email: EMAIL.strict(),
    password: PASSWORD.strict()
  })

  try {
    await correctCondition.validateAsync(dataValid, {abortEarly:false})

    next()
  } catch (error) {
    res.status(444).json({
      message:error.message
    })
  }
}

const userValidation = {
  register, login
}
module.exports = userValidation