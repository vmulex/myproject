import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router = new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'login',
    //   component: (resolve) => require(['@/pages/Login/Login.vue'], resolve)
    // }
  ]
})

const routerConfig = [
  {
    path: '/',
    name: 'index',
    component: (resolve) => require(['@/pages/Index/Index.vue'], resolve),
    children: [
      {
        path: '/index',
        name: 'home',
        component: (resolve) => require(['@/pages/Content/Home/Home.vue'], resolve)
      },
      {
        path: '/index/menuSetting',
        name: 'menuSetting',
        component: (resolve) => require(['@/pages/Content/Setting/MenuSetting.vue'], resolve)
      },
      {
        path: '/index/menuSetting/langSetting',
        name: 'langSetting',
        component: (resolve) => require(['@/pages/Content/Setting/LangSetting.vue'], resolve)
      },
      {
        path: '/index/menuSetting/langType',
        name: 'langType',
        component: (resolve) => require(['@/pages/Content/Setting/LangType.vue'], resolve)
      },
      {
        path: '/index/factorySetting',
        name: 'factorySetting',
        component: (resolve) => require(['@/pages/Content/Setting/FactorySetting.vue'], resolve)
      },
      {
        path: '/index/userSetting',
        name: 'userSetting',
        component: (resolve) => require(['@/pages/Content/Setting/UserSetting.vue'], resolve)
      },
      {
        path: '/index/menuButtonSetting',
        name: 'menuButtonSetting',
        component: (resolve) => require(['@/pages/Content/Setting/MenuButtonSetting.vue'], resolve)
      },
      {
        path: '/index/structureSetting',
        name: 'structureSetting',
        component: (resolve) => require(['@/pages/Content/Setting/StructureSetting.vue'], resolve)
      },
      {
        path: '/index/roleAuthSetting',
        name: 'roleAuthSetting',
        component: (resolve) => require(['@/pages/Content/Setting/RoleAuthSetting.vue'], resolve)
      },
      {
        path: '/index/userAuthSetting',
        name: 'userAuthSetting',
        component: (resolve) => require(['@/pages/Content/Setting/UserAuthSetting.vue'], resolve)
      }
    ]
  }
]

router.addRoutes(routerConfig)

export default router
