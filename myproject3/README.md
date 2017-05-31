# 一步一步搭建一个express+webpack+moogoose开发环境

#### 1.用express生成一个express开发环境

#### 2.安装所有依赖，包括react,babel,webpack,nunjucks,moogoose等

#### 3.写webpack.config.js文件，目前水平有限仅用到webpack的打包功能

* 需要引入path模块

* entry,写需要打包的文件，使用react的话，就将react的最上层js打包(含ReactDOM.render)

* output,写打包文件输出的文件名和它的路径

* modul-->rules-->各种loader

#### 4.view中index.html引入打包的文件，bundle.js,注意该文件的路径仅需要写在public下的路径，因为在最外层的app.js中做了设置，将public作为静态文件的根目录

#### 5.用react中jsx语法写组件，这些组件以webpack中的entry入口的js为最上层组件以此丰富展开

#### 6.封装后台数据库操作的接口，本项目封装了mongoose和mysqljs的增删改查的一些接口

* mongoose内置了增删改查的很多方法，比如insert()、update()等，这些方法都是绑定在model上的，mongoose中需要新建Schema并且将其转化为model才能调用这些方法，详见项目内注释

* mysqljs主要还是依靠的sql语句，方法基本上都是调用的connection.query()，mysql中有连接池的概念，这里需要特别注意，在连接池中getconnection后需要将其release()或是destroy()

#### 7.router中除了负责页面跳转逻辑，还负责分配component中的各种请求request(get、post等)

* 需要这里进行规定component中用fetch或者ajax请求的路径

* 调用了对应url的fetch和ajax的页面会将数据传递到该页面

* 数据的获得在router中通过引用model中的模块来进行增删改查操作