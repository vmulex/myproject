/* 
** app.js文件是整个项目的入口文件，所有的请求、回应都从本文件开始
** app就是一个大的框架，其实最基本的实现主要一个app.js就可以了，但是为了代码管理将app.js
** 作为一个大的架子，然后将其他的代码分类归属到其他的文件中，如router和view
*/
// 1.加载模块
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');

///2.加载router
var index = require('./routes/index');
var users = require('./routes/users');

//3.创建express对象app并监听端口
var app = express();
app.listen(3001);

// view engine setup
// 4、选择模板，本项目采用nunjucks
/* 
** app.set(name,value)
** 把名字为name的项的值设为value，用于设置参数
** app.set('views', path.join(__dirname, 'views'));   设置了模版文件夹的路径；
** 主要清楚__dirname的意思就可以了，它是node.js中的全局变量，表示取当前执行文件的路径
** app.set('view engine', 'html');  设置使用的模版引擎，我们使用的nunjucks
*/
nunjucks.configure(path.join(__dirname,'views'),{
	autoescape: true,
	express: app
})
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
/* 
** 4.选择依赖的中间件，下面的不一定在本项目中都使用了，为了学习列出了部分
** uncomment after placing your favicon in /public
** app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
** app.use([path], function)
** 用这个方法来使用中间件，因为express依赖于connect，有大量的中间件，可以通过app.use来使用；
** path参数可以不填，默认为'/'  (项目中用到的就不分别解释了，用到的时候自已查API的中间件部分)
** app.use(express.static(path.join(__dirname, 'public'))); 
** 这一句中可能要注意一下，express.static( )是处理静态请求的，设置了public文件，
** public下所有文件都会以静态资料文件形式返回（如样式、脚本、图片素材等文件），
** 使用这句话后，在view中绑定的js文件就直接以public为更目录了，即可直接引用public中的js---bundle.js
*/ 
// app.use(logger('dev'));                                      //这部分目前没有使用
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* 
** 5、浏览器url对应的router，这里的index、users等变量在2中进行了加载
** 表示当用户使用/访问时，调用routes，即routes目录下的index.js文件，其中.js后缀省略，
** 用/users访问时，调用routes目录下users.js文件
** 这就是为什么，我们示例中用http://localhost:8100/访问是，修改的index.js里的文件代码可以执行
*/
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
