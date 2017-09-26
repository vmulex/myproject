import * as types from './mutation-types'
import axios from 'axios'
import url from '../pages/urlConfig'

export default {
    // 增加tab
  [types.ADD_NEW_TAB] (state, newTab) {
    let hasTab = state.tabList.some((tab) => {
      return tab.name === newTab.name
    })

    if (!hasTab) {
      state.tabList.push(
        newTab
      )
    }
    state.currentView = newTab.menuId
  },
  [types.DEL_TAB] (state, index) {
    if (index) {
      state.tabList.splice(index, 1)
    }
  },
  [types.ADD_HOME_MENU] (state, menuItem) {
    state.homeMenu.push(menuItem)
  },
  [types.DEL_HOME_MENU] (state, index) {
    state.homeMenu.splice(index, 1)
  },
  [types.SHOW_MENU_INFO] (state, menuInfo) {
    state.menuInfo = JSON.parse(menuInfo)
    state.basiLangMenu = state.menuInfo.resourceDescribe
  },
  [types.SHOW_CONTEXT_MENU] (state, contextmenuInfo) {
    // console.log(contextmenuInfo)
    state.contextMenuInfo = contextmenuInfo
  },
  [types.HIDE_CONTEXT_MENU] (state) {
    state.contextMenuInfo.showContext = false
  },
  [types.ADD_SIBLING_MENU] (state, type) {
    console.log(type)
    const level = state.contextMenuInfo.level
    const sort = state.contextMenuInfo.sort
    const parentId = state.contextMenuInfo.parentId
    let menuLevelArr = state.contextMenuInfo.menuId.split('-').map((val) => parseInt(val))
    let newMenuItem = {}
    let theMenuArr = []
    switch (level) {
      case 2:
        if (type === 'organ') {
          theMenuArr = state.organTree[menuLevelArr[0] - 1].child
          newMenuItem = {
            organName: '部门',
            organCode: menuLevelArr[0] + '-' + (theMenuArr.length + 1),
            organLevel: 2,
            organSort: theMenuArr.length + 1,
            parentOrgan: parentId,
            child: []
          }
          theMenuArr.push(newMenuItem)
        } else {
          theMenuArr = state.menuTree[menuLevelArr[0] - 1].child
          newMenuItem = {
            resourceType: 'COMPT000129',
            resourceName: '',
            resourceDescribe: '新菜单',
            resourceCode: menuLevelArr[0] + '-' + (theMenuArr.length + 1),
            resourceLevel: 2,
            resourceSort: theMenuArr.length + 1,
            resourceUrl: '',
            parentResource: parentId,
            child: []
          }
          theMenuArr.push(newMenuItem)
        }
        break
      case 3:
        if (type === 'organ') {
          theMenuArr = state.organTree[menuLevelArr[0] - 1].child[menuLevelArr[1] - 1].child
          newMenuItem = {
            organName: '部门',
            organCode: menuLevelArr[0] + '-' + menuLevelArr[1] + '-' + (theMenuArr.length + 1),
            organLevel: 3,
            organSort: theMenuArr.length + 1,
            parentOrgan: parentId,
            child: []
          }
          theMenuArr.push(newMenuItem)
        } else {
          theMenuArr = state.menuTree[menuLevelArr[0] - 1].child[menuLevelArr[1] - 1].child
          newMenuItem = {
            resourceType: 'COMPT000129',
            resourceName: '',
            resourceDescribe: '新菜单',
            resourceCode: menuLevelArr[0] + '-' + menuLevelArr[1] + '-' + (theMenuArr.length + 1),
            resourceLevel: 3,
            resourceSort: theMenuArr.length + 1,
            resourceUrl: '',
            parentResource: parentId,
            child: []
          }
          theMenuArr.push(newMenuItem)
        }
        break
      default:
        if (type === 'organ') {
          newMenuItem = {
            organName: '部门',
            organCode: 'new_organ',
            organLevel: 1,
            organSort: sort + 1,
            parentOrgan: parentId,
            child: []
          }
          state.organTree.push(newMenuItem)
        } else {
          newMenuItem = {
            resourceType: 'COMPT000129',
            resourceName: '',
            resourceDescribe: '新菜单',
            resourceCode: 'new_menu',
            resourceLevel: 1,
            resourceSort: sort + 1,
            resourceUrl: '',
            parentResource: parentId,
            child: []
          }
          state.menuTree.push(newMenuItem)
        }
    }
  },
  [types.ADD_CHILD_MENU] (state, type) {
    const level = state.contextMenuInfo.level
    const sort = state.contextMenuInfo.sort
    const parentId = state.contextMenuInfo.dbId
    let newMenuItem = {}
    let theMenuArr = []
    switch (level) {
      case 1:
        if (type === 'organ') {
          theMenuArr = state.organTree[sort - 1].child
          newMenuItem = {
            organName: '部门',
            organCode: sort + '-' + (theMenuArr.length + 1),
            organLevel: 2,
            organSort: theMenuArr.length + 1,
            parentOrgan: parentId,
            child: []
          }
          theMenuArr.push(newMenuItem)
        } else {
          theMenuArr = state.menuTree[sort - 1].child
          newMenuItem = {
            resourceType: 'COMPT000129',
            resourceName: '',
            resourceDescribe: '新菜单',
            resourceCode: sort + '-' + (theMenuArr.length + 1),
            resourceLevel: 2,
            resourceSort: theMenuArr.length + 1,
            resourceUrl: '',
            parentResource: parentId,
            child: []
          }
          theMenuArr.push(newMenuItem)
        }
        break
      case 2:
        if (type === 'organ') {
          let menuLevelArr = state.contextMenuInfo.menuId.split('-').map((val) => parseInt(val))
          theMenuArr = state.organTree[menuLevelArr[0] - 1].child[menuLevelArr[1] - 1].child
          newMenuItem = {
            organName: '部门',
            organCode: menuLevelArr[0] + '-' + menuLevelArr[1] + '-' + (theMenuArr.length + 1),
            organLevel: 3,
            organSort: theMenuArr.length + 1,
            parentOrgan: parentId,
            child: []
          }
          theMenuArr.push(newMenuItem)
          break
        } else {
          let menuLevelArr = state.contextMenuInfo.menuId.split('-').map((val) => parseInt(val))
          theMenuArr = state.menuTree[menuLevelArr[0] - 1].child[menuLevelArr[1] - 1].child
          newMenuItem = {
            resourceType: 'COMPT000129',
            resourceName: '',
            resourceDescribe: '新菜单',
            resourceCode: menuLevelArr[0] + '-' + menuLevelArr[1] + '-' + (theMenuArr.length + 1),
            resourceLevel: 3,
            resourceSort: theMenuArr.length + 1,
            resourceUrl: '',
            parentResource: parentId,
            child: []
          }
          theMenuArr.push(newMenuItem)
          break
        }
      default:
        alert('不允许添加')
    }
  },
  [types.SWITCH_TAB] (state, menuId) {
    state.currentView = menuId
  },
  [types.CLOSE_DROPDOWN] (state) {
    state.rootOpen = false
  },
  [types.SHOW_ROLE_INFO] (state) {
    axios({
      method: 'get',
      url: url + '/role/getList'
      // url: '/apis/role/getList'
    })
      .then(function (response) {
        state.roleInfo = JSON.parse(response.data.data).map((element, index) => {
          return {
            index: (index + 1) + '',
            roleId: element.roleId,
            roleIndex: element.roleCode,
            roleDesc: element.roleDescribe,
            forbidden: element.roleStatus
          }
        })
      })
      .catch(function (fail) {
        console.log(fail)
      })
  },
  [types.SHOW_MENU_TREE] (state, langId) {
    // console.log(langId)
    axios({
      method: 'get',
      url: url + '/res/getTree',
      // url: '/apis/res/getTree',
      params: {
        languageId: langId,
        muteOrganId: 'COMPT00211',
        resourceType: 'COMPT000129'
      }
    })
      .then(function (response) {
        // console.log(JSON.parse(response.data.data))
        state.menuTree = JSON.parse(response.data.data)
        // console.log(state.menuTree)
      })
      .catch(function (fail) {
        console.log(fail)
      })
  },
  [types.SHOW_ALL_BUTTON] (state, langId) {
    console.log(langId)
    axios({
      method: 'get',
      url: url + '/res/getList',
      // url: '/apis/res/getList',
      params: {
        // 需要判断后传语言给和菜单一样
        languageId: langId,
        muteOrganId: 'COMPT00211',
        resourceType: 'COMPT000130'
      }
    })
      .then(function (response) {
        // console.log(JSON.parse(response.data.data))
        state.buttonData = JSON.parse(response.data.data).map((element, index) => {
          return {
            index: (index + 1) + '',
            buttonCode: element.resourceCode,
            basLangDesc: element.resourceDescribe,
            resourceId: element.resourceId
          }
        })
      })
      .catch(function (fail) {
        console.log(fail)
      })
  },
  // [types.SWITCH_LANG] (state, langId) {
  //   axios({
  //     method: 'get',
  //     url: url + '/res/getTree',
  //     // url: '/apis/res/getTree',
  //     params: {
  //       languageId: langId,
  //       muteOrganId: 'COMPT00211',
  //       resourceType: 'COMPT000129'
  //     }
  //   })
  //     .then(function (response) {
  //       // console.log(123)
  //       // state.language = 'en-US'
  //       // console.log(state.language)
  //       state.MENU = JSON.parse(response.data.data)
  //       state.menuTree = JSON.parse(response.data.data)
  //     })
  //     .catch(function (fail) {
  //       console.log(fail)
  //     })
  // },
  [types.SHOW_ORGAN_SELECTED] (state, organSelectedData) {
    // console.log(JSON.parse(organSelectedData))
    state.organSelectedData = JSON.parse(organSelectedData)
  },
  [types.SHOW_ORGAN_TREE] (state) {
    axios({
      method: 'get',
      url: url + '/org/getTree',
      // url: '/apis/org/getTree',
      params: {
        muteOrganId: 'COMPT00211'
      }
    })
      .then(function (response) {
        console.log(JSON.parse(response.data.data))
        state.organTree = JSON.parse(response.data.data)
      })
      .catch(function (fail) {
        console.log(fail)
      })
  },
  [types.CHANGE_AUTH] (state, data) {
    console.log(data)
    if (data.status) {
      if (!state.authSelected.includes(data.auId)) {
        state.authSelected.push(data.auId)
        console.log('添加吧')
      } else {
        console.log('有错误')
      }
    } else {
      if (state.authSelected.includes(data.auId)) {
        state.authSelected = state.authSelected.filter((element) => {
          return element !== data.auId
        })
        console.log('删除吧')
      }
    }
  }
}
