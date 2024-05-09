const Joi = require('joi')


const OBJECT_ID_RULE = /^[0-9a-fA-F]{24}$/
const PHONENUMER_REGEX = /^[0-9]{10,11}$/
const OBJECT_ID_RULE_MESSAGE = 'Your string fails to match the Object Id pattern!'

const STRING = Joi.string().trim()
const NUMBER = Joi.number()
const BOOLEAN = Joi.boolean()

//user
const ID = STRING.pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
const EMAIL = STRING.email()
const PHONENUMBER = STRING.pattern(PHONENUMER_REGEX)
const URL = STRING.uri()
const PASSWORD = STRING.min(6)

//product
const TIME_STAMP = Joi.date().timestamp('javascript')//default(Date.now)

const ARRAY_OBJECT = (item) => {
  return Joi.array().items(item)
}


//error
const STATUS_CODE_ERROR_VALIDATION = 451

const validatorConstant = {
  OBJECT_ID_RULE,
  OBJECT_ID_RULE_MESSAGE,
  PHONENUMBER,
  PHONENUMER_REGEX,
  ID,
  EMAIL,
  URL,
  PASSWORD,
  TIME_STAMP,
  ARRAY_OBJECT,
  STRING,
  NUMBER,
  BOOLEAN
}

module.exports = validatorConstant