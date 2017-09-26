import * as types from './mutation-types'

export default {
  addNewTab ({ commit }, tabInfo) {
    commit(types.ADD_NEW_TAB, tabInfo)
  },
  delTab ({ commit }, index) {
    commit(types.DEL_TAB, index)
  },
  addHomeMenu ({ commit }, menuItem) {
    commit(types.ADD_HOME_MENU, menuItem)
  },
  delHomeMenu ({ commit }, index) {
    commit(types.DEL_HOME_MENU, index)
  },
  showMenuInfo ({ commit }, menuInfo) {
    commit(types.SHOW_MENU_INFO, menuInfo)
  },
  showContextMenu ({ commit }, contextmenuInfo) {
    commit(types.SHOW_CONTEXT_MENU, contextmenuInfo)
  },
  hideContextMenu ({ commit }) {
    commit(types.HIDE_CONTEXT_MENU)
  },
  addSiblingMenu ({ commit }, type) {
    commit(types.ADD_SIBLING_MENU, type)
  },
  addChildMenu ({ commit }, type) {
    commit(types.ADD_CHILD_MENU, type)
  },
  switchTab ({ commit }, menuId) {
    commit(types.SWITCH_TAB, menuId)
  },
  closedropDown ({ commit }) {
    commit(types.CLOSE_DROPDOWN)
  },
  refreshRole ({ commit }) {
    commit(types.SHOW_ROLE_INFO)
  },
  refreshMenu ({ commit }, langId) {
    commit(types.SHOW_MENU_TREE, langId)
  },
  refreshButton ({ commit }, langId) {
    commit(types.SHOW_ALL_BUTTON, langId)
  },
  switchLang ({ commit }, langId) {
    commit(types.SWITCH_LANG, langId)
  },
  showOrganSelected ({ commit }, OrganSelectedData) {
    commit(types.SHOW_ORGAN_SELECTED, OrganSelectedData)
  },
  showOrganTree ({ commit }, langId) {
    commit(types.SHOW_ORGAN_TREE, langId)
  },
  changeAuth ({ commit }, auId, status) {
    commit(types.CHANGE_AUTH, auId, status)
  }
}
