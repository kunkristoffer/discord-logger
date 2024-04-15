import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },{
      path: '/attendance',
      component: () => import('../views/attendance/Index.vue'),
    },{
      path: '/create',
      component: () => import('../views/Create.vue'),
    },{
      path: '/users',
      component: () => import('../views/users/Index.vue'),
    },{
      path: '/users/:id',
      component: () => import('../views/users/User.vue'),
    },{
      path: '/groups',
      component: () => import('../views/groups/Index.vue'),
    },{
      path: '/groups/:id',
      component: () => import('../views/groups/Group.vue'),
    },
  ]
})

export default router
