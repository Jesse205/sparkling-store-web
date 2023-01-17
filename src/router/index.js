// Composables
import { createRouter, createWebHashHistory } from 'vue-router'

const MainView = () => import('@/views/MainView/MainView.vue')
const MainHomeView = () => import('@/views/MainView/MainHomeView.vue')
const MainSortView = () => import('@/views/MainView/MainSortView.vue')
const MainUpdateView = () => import('@/views/MainView/MainUpdateView.vue')
const MainMeView = () => import('@/views/MainView/MainMeView.vue')

const UploadView = () => import('@/views/UploadView.vue')
const routes = [
  {
    path: '/',
    component: MainView,
    children: [
      {
        path: '/',
        redirect: '/home'
      },
      {
        path: 'home',
        name: 'Home',
        component: MainHomeView,
      },
      {
        path: 'sort',
        name: 'Sort',
        component: MainSortView,
      },
      {
        path: 'update',
        name: 'Update',
        component: MainUpdateView,
      },
      {
        path: 'me',
        name: 'Me',
        component: MainMeView
      },
    ],
  },
  {
    path: '/upload',
    name: 'Upload',
    component: UploadView
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
const history = createWebHashHistory(process.env.BASE_URL)
const router = createRouter({
  history,
  routes,
})

router.afterEach((to, from) => {
  let name = history.state.forward ? 'scroll-x-transition' : 'scroll-x-reverse-transition'
  to.meta.transition = name
  from.meta.transition = name
})

export default router
