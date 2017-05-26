
//定义数据库模型
var mongoose = require('mongoose');

//连接数据库
var DB_URL = 'mongodb://localhost:27017/db';
mongoose.connect(DB_URL);

//数据集合十分简单，两个字段，内容和时间，并保存在 todo 表中
var Schema = mongoose.Schema;

var Todo = new Schema({
    content: {
        type: String, 
        required: true
    },
    date: {
        type: String, 
        required: true
    }
});

Todo = mongoose.model('Todolist', Todo);

/**
 * 插入一些数据进行模拟
 */
function insert() {
 	var user1 = new Todo({
 		content: 'get up',
		date: '7点',
 	});

 	user1.save(function (err, res) {
 		if (err) {
 			console.log('Error:' + err);
 		}
 		else {
 			console.log('Res:' + res)
 		}
 	});

 	var user2 = new Todo({
 		content: 'breakfast',
		date: '8点',
 	});

 	user2.save(function (err, res) {
 		if (err) {
 			console.log('Error:' + err);
 		}
 		else {
 			console.log('Res:' + res)
 		}
 	});

 	var user3 = new Todo({
 		content: 'work',
		date: '9点',
 	});

 	user3.save(function (err, res) {
 		if (err) {
 			console.log('Error:' + err);
 		}
 		else {
 			console.log('Res:' + res)
 		}
 	});
 }

// insert();
module.exports = Todo;