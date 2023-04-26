import { createRouter, createWebHistory ,createWebHashHistory} from 'vue-router'
import visualization from '../views/visualization.vue'

const routes = [
	{
	  path: '/',
	  redirect: '/login',
	},
	{
	  path: '/login',
	  name: 'login',
	  component: () => import('../views/login.vue'),
	},
  {
    path: '/home',
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
function getCookieValue(key,cookies){
		  let cookiesArr=cookies.split(";")
		  for(let i of cookiesArr){
			  let coo= cookies.trim().split("=")
			  let keyname=coo[0]
			  if (keyname==key){
				  return coo[1]
			  }
		  }
	  }
router.beforeEach((to, from,next) => {
  // to将要访问的路径
  // from 代表从哪个路径跳转而来
  // next()放行 next('/login')强制跳转
  if (to.path === '/login'||to.path === '/') return next()
  // 获取token
  // const tokenStr = window.sessionStorage.getItem('token')
  const ss=document.cookie
  let cookieStr= getCookieValue("token",ss)
  if (!cookieStr && to.path !== '/') {
    console.log('reset to login')
    next('/login')
  }
  next()
})

export default router
