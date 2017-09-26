import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  // 这里的MENU是供菜单设置的页面的
  MENU: [],
  // 这里的tabList是内容页面中的tab标签页选项, currentView是当前的
  currentView: '0',
  tabList: [
    {
      menuId: '0',
      name: 'home',
      path: '/index'
    }
  ],
  // 这里的homeMenu是home页面中的快捷方式选项
  // 这里考虑从存放在localstorge中，初始化的时候从localstorge中拉取
  homeMenu: [],
  // 设置菜单的实时数据双向绑定，因为存在祖孙组件信息的传递，所以考虑还是放在这里
  menuInfo: '',
  // 设置菜单时需要右键鼠标显示选框来进行增删菜单项
  basiLangMenu: '',    // 赶时间需要优化
  contextMenuInfo: '',
  // 控制下拉框是否展开收回
  rootOpen: false,
  buttonAuth: [],
  roleInfo: [],
  // 菜单配置页面中的树形结构需要语言切换
  languageId: 'COMPT0001217',
  // 其他资源的语言切换
  language: 'zh-CN',
  menuTree: [],
  buttonData: [],
  changePwdStatus: false,
  // 用户配置页面用的组织部门数据
  organTree: '',
  organ: '',
  organId: '',
  // 组织架构配置页面的组织部门数据
  organSelectedData: '',
  // 角色配置页面
  authSelected: []
}

// 用的vuex的modules,为什么用module就不行呢？？？？？？----形式写错了，再看看文档
// const moduleLocal = {
//   state: state,
//   mutations: mutations,
//   actions: actions
// }
// // 创建了store，并包含数据
// export default new Vuex.Store({
//   modules: {
//     moduleLocal: moduleLocal
//   }
// })

export default new Vuex.Store({
  state,
  mutations,
  actions
})
