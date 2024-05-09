var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  throw new Error('lỗi')
  res.status(200).json('ok');
});

module.exports = router;
