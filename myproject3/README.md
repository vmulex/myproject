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