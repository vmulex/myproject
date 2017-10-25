// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'
import 'element-ui/lib/theme-default/index.css'
import { Input, Dialog, Button } from 'element-ui'
import './style/customize.less'
import 'font-awesome/css/font-awesome.css'
import './mock.js'
Vue.config.productionTip = false
Vue.prototype.axios = axios

Vue.use(Input)
Vue.use(Dialog)
Vue.use(Button)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  Vuex,
  render: h => h(App),
  template: '<App/>',
  components: { App }
})
