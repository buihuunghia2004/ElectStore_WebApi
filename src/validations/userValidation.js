const Joi = require("joi")
const { EMAIL, STRING, PASSWORD } = require("../utils/validatorConstant")
const e = require("express")

const register = async (req, res, next) => {
  const dataValid = req.body
  const correctCondition = Joi.object({
    userName: STRING.strict(),
    email: EMAIL.strict(),
    password: PASSWORD.strict()
  })

  try {
    await correctCondition.validateAsync(dataValid, { abortEarly: false })

    next()
  } catch (error) {
    console.log(error);
    res.status(444).json({
      message: error.message
    })
  }
}
const login = async (req, res, next) => {
  const { email, password } = req.body

  try {
    let errors = []
    try {
      await EMAIL.validateAsync(email)
    } catch (error) {
      errors.push(1001)
    }
    try {
      await PASSWORD.validateAsync(password)
    } catch (error) {
      errors.push(1002)
    }

    if (errors.length > 0) {
      throw errors
    }

    next()
  } catch (error) {
    console.log(error);
    res.status(444).json(
      {
        status:false,
        code:error
      }
    )
  }
}

const userValidation = {
  register, login
}
module.exports = userValidation