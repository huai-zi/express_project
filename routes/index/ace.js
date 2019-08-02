var express = require('express');
var router = express.Router();

router.get('/', function (req, res, nuxt) {
    res.send('我等我的爱')
})

module.exports = router