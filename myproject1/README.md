# react+node

### 项目运用的技术

* react+node+express+webpack

### 总结

* 1.基本的代码结构还是按照的node+express开发流程设计

* 2.在原来express开发模式上增加了webpack和react

* 3.react的作用是将原来express中view的html模板进行重构，用react组件的形式来构建

* 4.webpack的作用是将react写的所有组件js及相应的css打包到public的bundle.js，然后由view中的html模板来引用

### 作用及效果

* 1.view中基本可不用模板，只写一个html即可，而且html和相当简单，只需一个元素标签

* 2.view中页面的渲染工作全部由那一个单独的html引入的bundle.js来进行渲染，即react来渲染

* 3.后台数据的增删改查在model中的js封装，一般都是mongoose的api

* 4.路由运用的是express中的路由，封装了页面跳转逻辑并调用model的js文件中封装好了的增删改查函数

* 5. express中的路由没有使用res中的render函数，而是使用的res的json

* 6.组件中通过运用ajax(后面可以换成fetch)来对不同页面路径url(这些url在router中封装)进行请求

* 7.因为这个demo中路由用的是res.json(),即向client传递的是json格式的数据，页面的渲染工作交给client，而在一般node项目中router使用的是res.render(),由服务器端渲染好HTML string后response给前端

