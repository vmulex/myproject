import Vue from 'vue'
import VueI18n from 'vue-i18n'
// import store from '../store'
// import zh from './lang/zh'
// import en from './lang/en'

Vue.use(VueI18n)
// 获取语言，重新刷新页面
const langType = localStorage.getItem('lang')
console.log(langType)
const i18n = new VueI18n({
  locale: langType,
  messages: {
    'zh-CN': {hello: 'hello world'},
    'en-US': {hello: 'こんにちは、世界'}
  }
})

export default i18n
