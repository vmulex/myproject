// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import Router from 'vue-router'
import axios from 'axios'
import store from './store'
import i18n from './i18n'
import 'element-ui/lib/theme-default/index.css'
import { Table, TableColumn, DatePicker } from 'element-ui'
import './style/common.less'
import 'font-awesome/css/font-awesome.css'

Vue.config.productionTip = false
Vue.prototype.axios = axios

Vue.use(Router)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DatePicker)
/* eslint-disable no-new */

// ----------------------------------------------------------------------------------------------
// axios({
//   method: 'post',
//   // url: 'http://10.204.228.27:80/compt/login',
//   url: '/apis/login',
//   params: {
//     userAccount: 'admin',
//     userPwd: '1'
//   }
// })
//   .then(function (response) {
//     console.log(response)
//     let menuArr = JSON.parse(response.data.data)
//     let storage = {
//       menu: menuArr
//     }
//     sessionStorage.setItem('menuInfo', JSON.stringify(storage))
//   })
//   .catch(function (fail) {
//     console.log(fail)
//   })
// -------------------------------------------------------

let storage = {menu: [
  {
    resourceType: 'COMPT000129',
    resourceName: 'setting',
    resourceDescribe: '配置',
    resourceCode: '1',
    resourceLevel: 1,
    resourceSort: 1,
    resourceUrl: '',
    attribute1: '',  // 语言编号
    attribute2: '',  // 界面ID
    resourceStatus: '',  // COMPT000119 是 COMPT000120 否
    child: [
      {
        resourceType: 'COMPT000129',
        resourceName: 'menuSetting',
        resourceDescribe: '菜单配置',
        resourceCode: '1-1',
        resourceLevel: 2,
        resourceSort: 1,
        resourceUrl: '/index/menuSetting',
        attribute1: '',  // 语言编号
        attribute2: '',  // 界面ID
        resourceStatus: '',
        child: []
      },
      {
        resourceType: 'COMPT000129',
        resourceName: '',
        resourceDescribe: '语言配置',
        resourceCode: '1-2',
        resourceLevel: 2,
        resourceSort: 2,
        resourceUrl: '/index/menuSetting',
        attribute1: '',  // 语言编号
        attribute2: '',  // 界面ID
        resourceStatus: '',
        child: [
          {
            resourceType: 'COMPT000129',
            resourceName: 'langType',
            resourceDescribe: '语言种类配置',
            resourceCode: '1-2-1',
            resourceLevel: 3,
            resourceSort: 1,
            resourceUrl: '/index/menuSetting/langType',
            attribute1: '',  // 语言编号
            attribute2: '',  // 界面ID
            resourceStatus: '',
            child: []
          },
          {
            resourceType: 'COMPT000129',
            resourceName: 'langSetting',
            resourceDescribe: '新增语言配置',
            resourceCode: '1-2-2',
            resourceLevel: 3,
            resourceSort: 2,
            resourceUrl: '/index/menuSetting/langSetting',
            attribute1: '',  // 语言编号
            attribute2: '',  // 界面ID
            resourceStatus: '',
            child: []
          }
        ]
      },
      {
        resourceType: 'COMPT000129',
        resourceName: 'factorySetting',
        resourceDescribe: '工厂配置',
        resourceCode: '1-3',
        resourceLevel: 2,
        resourceSort: 3,
        resourceUrl: '/index/factorySetting',
        attribute1: '',  // 语言编号
        attribute2: '',  // 界面ID
        resourceStatus: '',
        child: []
      },
      {
        resourceType: 'COMPT000129',
        resourceName: 'menuButtonSetting',
        resourceDescribe: '菜单操作权限配置',
        resourceCode: '1-4',
        resourceLevel: 2,
        resourceSort: 4,
        resourceUrl: '/index/menuButtonSetting',
        attribute1: '',  // 语言编号
        attribute2: '',  // 界面ID
        resourceStatus: '',
        child: []
      },
      {
        resourceType: 'COMPT000129',
        resourceName: 'structureSetting',
        resourceDescribe: '组织结构配置',
        resourceCode: '1-5',
        resourceLevel: 2,
        resourceSort: 5,
        resourceUrl: '/index/structureSetting',
        attribute1: '',  // 语言编号
        attribute2: '',  // 界面ID
        resourceStatus: '',
        child: []
      },
      {
        resourceType: 'COMPT000129',
        resourceName: 'userSetting',
        resourceDescribe: '用户配置',
        resourceCode: '1-6',
        resourceLevel: 2,
        resourceSort: 6,
        resourceUrl: '/index/userSetting',
        attribute1: '',  // 语言编号
        attribute2: '',  // 界面ID
        resourceStatus: '',
        child: []
      },
      {
        resourceType: 'COMPT000129',
        resourceName: 'roleAuthSetting',
        resourceDescribe: '角色权限配置',
        resourceCode: '1-7',
        resourceLevel: 2,
        resourceSort: 7,
        resourceUrl: '/index/roleAuthSetting',
        attribute1: '',  // 语言编号
        attribute2: '',  // 界面ID
        resourceStatus: '',
        child: []
      },
      {
        resourceType: 'COMPT000129',
        resourceName: 'userAuthSetting',
        resourceDescribe: '用户权限配置',
        resourceCode: '1-8',
        resourceLevel: 2,
        resourceSort: 8,
        resourceUrl: '/index/userAuthSetting',
        attribute1: '',  // 语言编号
        attribute2: '',  // 界面ID
        resourceStatus: '',
        child: []
      }
    ]
  }
]}
sessionStorage.setItem('menuInfo', JSON.stringify(storage))
// new Vue({
//   el: '#app',
//   store,
//   i18n,
//   render: h => h(App),
//   template: '<App/>',
//   components: { App }
// })
// --------------------------------------------------------------------------------------------------

let menu = sessionStorage.getItem('menuInfo')
if (menu) {
  menu = JSON.parse(menu).menu
  // 筛选得到实际路由
  let componentConfig = require('./pages/componentConfig')
  let routes = [
    {
      path: '/',
      name: 'index',
      component: componentConfig.default.Common.index,
      children: [
        {
          path: '/index',
          name: 'home',
          component: componentConfig.default.Common.home
        }
      ]
    }
  ]
  let addRouter = function (menu) {
    menu.forEach((menu) => {
      if (menu.child.length) {
        addRouter(menu.child)
      } else {
        let menuItem = {
          path: menu.resourceUrl ? menu.resourceUrl : '',
          name: menu.resourceName ? menu.resourceName : '',
          component: componentConfig.default.Content[menu.resourceName]
        }
        routes[0].children.push(menuItem)
      }
    })
  }
  addRouter(menu)
  // 创建路由对象
  let router = new Router({routes: routes})
  store.state.MENU = menu
  // 生成Vue实例
  new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App),
    template: '<App/>',
    components: { App }
  })
} else {
  // location.href = './login.html'
}

