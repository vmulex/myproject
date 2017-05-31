/*
**@mysql数据库操作
**@1.nodejs操作数据库进行增删改查一般主要通过的是SQL语句，不像mongoose一样调用不同的方法
**@2.调用的方法均为connection.query(),通用的方式为query(sql, function(){})
**@3.另一种是可以通过占位符？来自由控制sql语句
**@4.最后一种方式是通过一个json，即将原来写sql语句的地方改为写一个json，query其他的option都写入，详见api文档
*/

var mysql = require('mysql');
//数据库的名字
// var DB_NAME = 'nodesample';

/*
**@用连接池的时候
**@1.pool可以直接调用query(),但是一般常用的是调用pool的getConnection((err, connection) => {...})方法
**@2.一个connection用完后，需要调用connection.release(),这个连接就会回到pool中
**@3.销毁这个连接调用connection.destroy(),这个连接就会销毁，函数调用时会重新建立一个新连接
*/
var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'hujun',
    database : 'nodesample'
});

function User(user) {
	this.username = user.username;
	this.userpwd = user.userpwd;
	this.userage = user.userage;
	this.logindate = user.logindate;	
}

//下面的增删改查都用到了userinfo表,还需要建一个userinfo表结构---table
/*
**@增添数据(向userinfo表中)
*/
User.prototype.insert = function insert() {
	var user = {
        username: this.username,
        userpass: this.userpass,
        userage: this.userage,
        logindate: this.logindate
    };

    pool.getConnection(function(err, connection) {
    	// var useDbSql = "USE " + DB_NAME;
    	var insertUser_Sql = "INSERT INTO userinfo(id,username,userpass) VALUES(0,?,?)";

  //   	connection.query(useDbSql, function(err) {
		// 	if (err) {
	 //            console.log("USE Error: " + err.message);
	 //            return;
	 //         }
	 //         console.log('USE succeed');
		// });

    	connection.query(insertUser_Sql, [user.username, user.userpass, user.userage, user.logindate], function(err, result) {
    		if (err) {
                console.log("insertUser_Sql Error: " + err.message);
                return;
            }

            connection.release();
            console.log(result);
    	})
    })
}

/*
**@根据用户名更改其数据
*/
User.prototype.update = function update(username, userpass) {
	pool.getConnection(function(err, connection) {
	    var updateUserInfoByUserName_Sql = 'UPDATE userinfo SET userpass = ? WHERE username = ?';
	    connection.query(updateUserInfoByUserName_Sql, [username, userpass], function (err, result) {
	    	if (err) {
                console.log("getUserByUserName Error: " + err.message);
                return;
            }

            connection.release();
            console.log(result);   
	    })
	})

}

/*
**@根据用户名得到用户信息
*/
User.prototype.getUserByUserName = function getUserNumByName(username) {
	pool.getConnection(function(err, connection) {
		var getUserInfoByUserName_Sql = "SELECT * FROM userinfo WHERE username = ?";

        connection.query(getUserByUserName_Sql, [username], function (err, result) {
            if (err) {
                console.log("getUserByUserName Error: " + err.message);
                return;
            }

            connection.release();
            console.log(result);                   
        });        
	});
};

/*
**@删除该用户
*/
User.prototype.removeUser = function removeUser(username) {
	pool.getConnection(function(err, connection) {
		var removeUser_Sql = 'DELETE FROM userinfo WHERE username = ?';

		connection.query(removeUser_Sql, [username], function(err, result) {
			if (err) {
                console.log("getUserByUserName Error: " + err.message);
                return;
            }

            connection.release();
            console.log(result);
		});
	});
};


/*
**@一般连接过程
*/
var connection = mysql.creatConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'hujun'
})

//首先就要建立连接，有两种方式：
//建立连接的第一种方式
//连接完了要connection.end()
connection.connect(function() {
	if (err) {
		console.error('error connecting: ' + err.stack);
	}

	console.log('connected as id ' + connection.threadId);
});

//建立连接的第二种方式，直接通过query()方法来建立
connection.query('SELECT 1', function (error, results, fields) {
	if (error) throw error;
})

module.exports = User;

