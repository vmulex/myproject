import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Go from '@/components/Go'
import Test1 from '@/components/Test1'

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
    },
    {
      path: '/test1',
      name: 'Test1',
      component: Test1
    }
  ]
})
