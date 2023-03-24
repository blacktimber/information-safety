import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import api from './service'
// 引入echarts
import echarts from './echarts/echarts.js'
import "element-plus/dist/index.css"
import {components, plugins} from './utils/elementPlus'
import method from './utils/data'
import '@/assets/css/reset.css'
import '@/../public/js/rem'
import '@/assets/css/common.css'
import store from './store'
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
app.config.globalProperties.$method = method
app.config.globalProperties.$http = api
app.config.globalProperties.$echarts = echarts;

app.use(router).use(store).mount('#app')
