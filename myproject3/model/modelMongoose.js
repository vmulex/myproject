/*
**@mongoose连接数据库
*/

var mongoose = require('mongoose');
var DB_URL = 'mongodb://localhost:27017/db525'

mongoose.connect(DB_URL);

var db = mongoose.connection;
db.on('error', function(err) {
	console.log('Mongoose connection open to ' + DB_URL);
});
db.once('open', function() {
	console.log('connected');
});

//新建Schema，规定Schema的各种属性
var UserSchema = mongoose.Schema({
	username: {type: String},
	userpwd: {type: String},
	userage: {type: Number},
	logindate: {type: Date}
});

UserSchema.methods.speak = function() {
	var greeting = '我的名字是' + this.username;
	console.log(greeting);
}

var User = mongoose.model('User', UserSchema);

//后面的函数需要一个全局变量User,我们在做增删改查的功能时,只是对其中的表即Schema进行操作,每一个表就包含姓名,密码等信息

/*
**mongoose中除了了那些save,remove,update等这些增删改查的方法外(这些方法都是要绑定在model上的)
**mongoose中的Schema上还有methods属性，它上面可以绑定一些方法，这些方法最后都会自动的绑定在model的原型上，
**所以后面新建的每个model都会除了一些属性外还可以调用这些方法
*/

/*
**增添数据
*/
function insertNewItem(username, userpwd, userage) {
	var user = new User({
		username: username,
		userpwd: userpwd,
		userage: userage,
		logindate: new Date()
	});
	
	//save中的callback的第二个参数为这个model实例
	user.save((err, res) => {
		if (err) {
			console.log(err);
		}
		else{
			console.log(res + 'has inserted  ' + res.speak());
		}
	})
}

/*
**修改已有数据
**可用在修改密码啊什么的
*/
function changePwd(username, userpwd) {
	var chosenItem = {'username': username};
	var updateOption = {'userpwd': userpwd};

	user.update(chosenItem, updateOption, function(){
		if (err) {
			console.log(err);
		}
		else{
			console.log(username + '\'s pwd has changed');
		}
	})
}

/*
**删除数据
*/
function deleteItem(username) {

}


/*
**@mysql连接数据库
*/