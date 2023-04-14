import { createRouter, createWebHistory ,createWebHashHistory} from 'vue-router'
import index from "../views/index.vue"
const routes = [
  {
    path: '/',
	name:index,
	component:index,
	redirect: '/Management',
	children: [
	  { path: '/Management', name: 'Management', component:()=> import('../views/Management.vue') },
	  { path: '/regular', name: 'regular', component: () => import('../views/regular.vue') },
	   { path: '/callThePolice', name: 'callThePolice', component: () => import('../views/callThePolice.vue') },
	  { path: '/journal', name: 'journal', component: () => import('../views/journal.vue') },
	]
  },
  {
    path: "/404",
    name:'notFound',
    component: () => import('../views/NotFoundView.vue')
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
  history: createWebHistory(),
  // history: createWebHashHistory(),
  routes
})

export default router
