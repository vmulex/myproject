//封装数据库操作接口
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'TodoList' });
});

//获取全部的todo
router.get('/getAllItems', (req, res, next) => {
	Todo.find({}).sort({'date': -1}).exec((err, todoList) => {
		if (err) {
			console.log(err);
		}
		else {
			res.json(todoList);
		}
	});
});

//添加todo
router.post('/addItem', (req, res, next) => {
	let newItem = req.body;
	Todo.create(newItem, (err) => {
		if (err) {
			console.log(err)
		}
		else {
			res.json(todoList)
		}
	})
})

//删除todo
router.post('deleteItem', (req, res, next) => {
	console.log(req.body);
	let delete_date = req.body.date;
	Todo.remove({date: delete_date}, (err, result) => {
		if (err) {
			console.log(err)
		}
		else {
			res.json(result)
		}
	});
});

module.exports = router;
//封装好接口之后，在组件中就可以通过 ajax 进行请求来完成数据的操作