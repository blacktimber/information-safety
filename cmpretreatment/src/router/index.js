import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component:HomeView,
	redirect: '/pretreatment/odata',
    children: [
      { path: '/pretreatment/odata', name: 'odata', component:()=> import('../views/ODataView'), meta:{ isLogin: true, roles: ['pretreatment'] } },
      { path: '/pretreatment/sublevel', name: 'sublevel', component: () => import('../views/SublevelView'), meta:{ isLogin: true, roles: ['pretreatment'] } },
      { path: '/pretreatment/participle', name: 'participle', component: () => import('../views/ParticipleView'), meta:{ isLogin: true, roles: ['pretreatment'] } },
      { path: '/pretreatment/keywords', name: 'keywords', component: () => import('../views/KeywordsView'), meta:{ isLogin: true, roles: ['pretreatment'] } },
	]
  },
  {
    path: "/404",
    name:'notFound',
    component: () => import('../views/NotFoundView.vue')
  },
  {
    path: "/detail",
    name:'detail',
    component: () => import('../views/DetailView.vue')
  },
  {
    path: "/:catchAll(.*)",
    redirect: {
      name:'notFound'
    },
    component: () => import('../views/NotFoundView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
