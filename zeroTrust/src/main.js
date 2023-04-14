import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import api from './service'
import router from './router'
import './assets/css/reset.css'
import './assets/css/common.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app=createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.config.globalProperties.$http = api
app.use(router).mount('#app')
