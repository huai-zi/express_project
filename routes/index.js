var express = require('express');
var app = express();
var router = express.Router();
var indexAce = require('./index/ace.js')
var bodyPaser = require('body-parser')
var fs = require('fs');
router.use('/index/ace', indexAce)

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('hello word')
});

router.get('/product', function (req, res, next) {
  res.send('product')
});

app.use(bodyPaser.json())
app.use(bodyPaser.urlencoded({
  extended: false
}))

//设置跨域请求头
router.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header("Content-Type", "application/json;charset=utf-8");
  console.log('调用');
  next();
});

// 下载文件
app.get('/download1', (req, res) => {
  console.log(req.query.fileName);
  res.set({
    "Content-Type": "application/octet-stream", //告诉浏览器这是一个二进制文件
    "Content-Disposition": `attachment; filename=${req.query.fileName}.txt` //告诉浏览器这是一个需要下载的文件
  });

  let filename = `./public/stylesheets/${req.query.files}.txt`

  var data = fs.readFileSync(filename, 'utf8');
  console.log(data);
  
  let texts = Math.random();
  texts.toString()
  // 写文件内容
  fs.writeFileSync(filename, texts);

  fs.createReadStream(filename).pipe(res);
});

router.get('/download', function (req, res, next) {
  let filename = req.query.file
  console.log(filename);
  res.download('../public/stylesheets/' + filename)

})
app.get('/api', function (req, res, next) {
  // 如果没有终结请求，或者next没有被调用，则会一直运行
  res.set('dataSapi', '999');
  console.log(req.query);
  res.send({
    user: 'tobi'
  })
})
app.post('/test', function (req, res, next) {
  // 如果没有终结请求，或者next没有被调用，则会一直运行
  res.send('请求未找到')
})
// 多端口服务
app.listen(9000)

module.exports = router;
module.exports = app;