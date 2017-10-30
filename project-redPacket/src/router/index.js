import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Go from '@/components/Go'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
      // children: [
      //   {
      //     path:
      //   }
      // ]
    },
    {
      path: '/go',
      name: 'Go',
      component: Go
    }
  ]
})
