var express = require('express');
var router = express.Router();
//引用model中的数据库操作模块，以mongoose为例
var user = require('../model/modelMongoose.js')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'App' });
});

//规定ajax和fetch的获取路径
router.get('/getAllItems', function(req, res, next) {
	//通过对user操作来对数据库进行操作
	res.send({ id: 123456, name: 'hujun', age: 30 });
})



module.exports = router;
