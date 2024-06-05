const successResponse = (data,message) =>{
  const res = {
    status:true,
    data:data,
    message:message
  }
  return res
}

module.exports = successResponse