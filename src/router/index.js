import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/authentication/login.vue"
import Code from "../views/coding/code.vue"
import LoadCode from "../views/coding/loadcode.vue"
import Profile from "../views/profile.vue"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/code',
    name: 'Code',
    component: Code
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/loadcode/:id',
    name: 'LoadCode',
    component: LoadCode,
    props:true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
