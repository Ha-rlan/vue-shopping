import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:"/login"
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/login.vue')
  },
  {
    path: "/register",
    component: ()=> import("../views/register.vue")
  },
  {
    path: "/home",
    component: ()=>import("../views/home.vue"),
    redirect: "/welcome",
    // child router ,notice the child is a array
    children:[
        {
      path:"/welcome",
      component: ()=>import("../views/welcome.vue")
    },
      {
        path: "/Manager",
        component: ()=>import("../components/user/users.vue")
      },
      {
        path:"/Permission",
        component: ()=> import("../components/power/rights.vue")
      },
      {
        path: "/Role",
        component: ()=> import("../components/power/Role.vue")
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
