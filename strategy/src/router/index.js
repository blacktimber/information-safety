import { createRouter, createWebHistory ,createWebHashHistory} from 'vue-router'
import StrategyIndex from '../views/StrategyIndex.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component:StrategyIndex,
	redirect: '/StrategyIndex/odata',
    children: [
      { path: '/StrategyIndex/odata', name: 'odata', component:()=> import('../views/odata'), meta:{ isLogin: true, roles: ['StrategyIndex'] } },
      { path: '/StrategyIndex/EngineJournal', name: 'EngineJournal', component: () => import('../views/EngineJournal'), meta:{ isLogin: true, roles: ['StrategyIndex'] } },
      { path: '/StrategyIndex/EngineStatus', name: 'EngineStatus', component: () => import('../views/EngineStatus'), meta:{ isLogin: true, roles: ['StrategyIndex'] } },
	]
  },
  {
    path: "/404",
    name:'notFound',
    component: () => import('../views/NotFoundView.vue')
  },
  {
    path: "/selectTotal",
    name:'selectTotal',
    component: () => import('../views/selectTotal.vue')
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
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
