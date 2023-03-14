import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './service'
import "element-plus/dist/index.css"
import {components, plugins} from './utils/elementPlus'
import '@/assets/css/reset.css'
import '@/../public/js/rem'
import '@/assets/css/common.css'

const app = createApp(App)
components.forEach(component =>{
    app.component(component.name, component)
})
plugins.forEach(plugin => {
    app.use(plugin)
    if (plugin === 'ElMessage') {
        app.config.globalProperties.$message = plugin
    }
    if (plugin === 'ElMessageBox') {
        app.config.globalProperties.$messageBox = plugin
    }
})
app.config.globalProperties.$http = api
app.use(store).use(router).mount('#app')
