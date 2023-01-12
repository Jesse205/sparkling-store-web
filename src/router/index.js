// Composables
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/MainView/MainView.vue'),
    children: [
      {
        path: '/',
        redirect: '/home'
      },
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/MainView/MainHomeView.vue'),
      },
      {
        path: 'sort',
        name: 'Sort',
        component: () => import('@/views/MainView/MainSortView.vue'),
      },
      {
        path: 'update',
        name: 'Update',
        component: () => import('@/views/MainView/MainUpdateView.vue'),
      },
      {
        path: 'me',
        name: 'Me',
        component: () => import('@/views/MainView/MainMeView.vue'),
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
