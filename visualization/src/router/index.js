import { createRouter, createWebHistory ,createWebHashHistory} from 'vue-router'
import visualization from '../views/visualization.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component:visualization,
	redirect: '/visualization/Exhibition',
    children: [
      { path: '/visualization/Exhibition', name: 'Exhibition', component:()=> import('../views/Exhibition') },
      { path: '/visualization/Administration', name: 'Administration', component: () => import('../views/Administration') },
	 
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
  history: createWebHistory(process.env.BASE_URL),
    // history: createWebHistory(),
  // history: createWebHashHistory(),

  routes
})

export default router
