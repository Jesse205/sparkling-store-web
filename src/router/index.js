// Composables
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/MainPage/MainPage.vue'),
    children: [
      {
        path: '/',
        redirect: '/home'
      },
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/MainPage/MainHome.vue'),
      },
      {
        path: 'sort',
        name: 'Sort',
        component: () => import('@/views/MainPage/MainSort.vue'),
      },
      {
        path: 'update',
        name: 'Update',
        component: () => import('@/views/MainPage/MainUpdate.vue'),
      },
      {
        path: 'me',
        name: 'Me',
        component: () => import('@/views/MainPage/MainMe.vue'),
      },
    ],
  },
  /*  {
     path: '/appinfo/:packagename',
     name: 'AppInfo',
     component: () => import('../views/AppInfo.vue')
   },
   {
     path: '/about',
     name: 'About',
     component: () => import('../views/About.vue')
   }, */
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
})

export default router
