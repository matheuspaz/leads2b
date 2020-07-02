import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

import Login from './views/Login'
import Dashboard from './views/Dashboard'
import Editor from './views/Editor'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/employee/:id?',
    name: 'Editor',
    component: Editor
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.API_URL,
  routes
})

router.beforeEach((to, from, next) => {    
  if (to.name === 'Login' && store.state.token !== null) {
    router.push({ name: 'Dashboard'})
    return
  }
  
  if (to.name !== 'Login' && store.state.token === null) {
    router.push({ name: 'Login'})
    next(false)
    return
  }

  if (routes.find(route => route.name == to.name) === undefined) {
    router.push({ name: 'Dashboard'})
    return
  }
  
  
  next()
})

export default router