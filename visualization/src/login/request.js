import axios from "axios"
import {ElLoading, ElMessage} from "element-plus";
var baseURLStr = window.g.BASE_URL;
const request = axios.create({
	baseURL:baseURLStr,
    timeout: 6000
})
let loading = ''
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"; stroke="#ffffff"/>
      `
function startLoading() {
    loading = ElLoading.service({
        lock: true, text: '正在加载中，请等候...', background: 'rgba(0, 0, 0, 0.7)', customClass: 'preLoading', spinner: svg
    })
}
function endLoading() {
    loading.close()
}
request.interceptors.request.use(config => {
    if (config.method === 'GET' || config.method === 'get') {
        config.data = {unused: 0}
    }
    if (config.type === 'upload') {
        config.headers['Content-Type'] = 'multipart/form-data;'
    } else if(config.type === 'download') {
        // config.headers['Content-Type'] = 'application/vnd.ms-excel;charset=utf-8'
        config.responseType = 'arraybuffer'
    }else {
        config.headers['Content-Type'] = 'application/json;charset=utf-8'
    }
    startLoading()
    return config
}, error => {
    endLoading()
    return Promise.reject(error);
})
request.interceptors.response.use(config => {
	 if(config.data.code !== 200){
		 ElMessage.error(config.data.msg);
	 }
        endLoading()
    return config
},
    error => {
        endLoading()
        if (error && error.response && error.response.status) {
            ElMessage.error(error.response.data.msg);
        }
    })
export default request
