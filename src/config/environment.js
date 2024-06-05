require('dotenv').config()

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,
  SECRET_KEY: process.env.SECRET_KEY
}