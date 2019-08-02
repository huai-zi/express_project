var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log(res);
  res.redirect('http://192.168.30.80:8001');
});

module.exports = router;