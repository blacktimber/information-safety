import { createRouter, createWebHashHistory,createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
	{
	  path: '/',
	  redirect: '/login',
	  meta: {
	    isLogin: false
	  }
	},
	{
	  path: '/login',
	  name: 'login',
	  component: () => import('../views/login.vue'),
	  meta: {
	    isLogin: false
	  }
	},
  {
    path: '/home',
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
  // history: createWebHashHistory(process.env.BASE_URL),
  history: createWebHistory(process.env.BASE_URL),
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
  if (to.path === '/login') return next()
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
