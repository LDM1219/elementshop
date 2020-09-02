import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Welcome from '../views/welcome.vue'
import Users from '../components/content/user/User.vue'
import Rights from '../components/content/power/Rights.vue'
import Roles from '../components/content/power/Roles.vue'
import Cate from '../components/content/goods/Cate.vue'
import Params from '../components/content/goods/Params.vue'
import GoodsList from '../components/content/goods/List.vue'
import Add from '../components/content/goods/Add.vue'
import Order from '../components/content/order/Order.vue'
Vue.use(VueRouter)

const routes = [{
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [{
        path: '/welcome',
        component: Welcome
      }, {
        path: '/users',
        component: Users
      }, {
        path: '/rights',
        component: Rights
      }, {
        path: '/roles',
        component: Roles
      }, {
        path: '/categories',
        component: Cate
      },
      {
        path: '/params',
        component: Params
      },
      {
        path: '/goods',
        component: GoodsList,

      },
      {
        path: '/goods/add',
        component: Add
      },
      {
        path: '/orders',
        component: Order
      }
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()

})
export default router