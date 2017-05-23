
//数据集合十分简单，两个字段，内容和时间，并保存在 todo 表中
var mongoose = require('mongoose');
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
}, { collection: 'todo' });

module.exports = Todo;