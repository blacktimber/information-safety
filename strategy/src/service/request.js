import axios from "axios"
import {ElLoading, ElMessage} from "element-plus";
import { useRouter } from "vue-router";
const router = useRouter()
var baseURLStr = window.g.BASE_URL;
const request = axios.create({
    // baseURL: "https://6043950n4x.oicp.vip:44960",
    // baseURL: "https://530008q6d3.zicp.fun:26711",
	// baseURL: "http://43.143.197.144:8201",
	// baseURL: "http://530008q6d3.zicp.fun:14288",
	baseURL: baseURLStr+"/strategic",
    // baseURL: "http://192.168.88.223:8002",
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
  const ss=document.cookie
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
  let token= getCookieValue("token",ss)
  if (token) {
      config.headers['token'] = token
  }
    startLoading()
    return config
}, error => {
    endLoading()
    return Promise.reject(error);
})
request.interceptors.response.use(config => {
        endLoading()
    return config
//     return config ? config.data : config
// }, error => {
//     console.log(error)
//     if (error.response.status !== '200') {
//         console.log('please log')
//         const router = useRouter()
//         router.push({
//             path: '/login'
//         })
//     }
},
    error => {
        endLoading()
        if (error && error.response && error.response.status) {
            switch (error.response.status) {
                case 401:
					ElMessage.error('Token过期')
					document.cookie = "token=;Path=/ ";
					window.open('/login',"_self")
                    break;
                case 500:
                    ElMessage.error(error.response.data.msg);
                    break;
                case 404:
                    ElMessage.error(error.response.data.msg);
                    break;
                default:
                    break;
            }
        }
        // return Promise.reject(error);
    })
export default request
// // loading
// // fail
// // clear
// let Toast = {
//     loading: (data) => {
//         console.log(data)
//     },
//     fail: (data) => {
//         console.log(data)
//     },
//     clear: () => {
//         console.log("clear")
//     },
// };
//
// // create axios instance
// const service = axios.create({
//     // baseURL,
//     // timeout: 150000000, // request timeout time
// })
//
// export function initRequest(config) {
//     // console.log("初始化request");
//     const { baseURL: baseURLConfig, ...toastConfig } = config;
//     Toast = toastConfig;
//     baseURL = baseURLConfig;
// }
//
// // request interceptors
// service.interceptors.request.use(
//     (config) => {
//         Toast.loading({ duration: 0, message: "加载中..." });
//         config.headers["UTOKEN"] = sessionStorage.getItem("token") || "";
//         config.headers["companyCode"] = sessionStorage.getItem("companyCode") || "stu";
//         config.headers["siteCode"] = sessionStorage.getItem("siteCode") || "stu";
//         config.headers["client"] = "app";
//
//         // 判断是否是上传，修改Content-Type
//         if (config.uploadFile) {
//             config.headers["Content-Type"] = "multipart/form-data";
//         }
//
//         // base url
//         config.url = baseURL + config.url;
//
//         return config;
//     },
//     (error) => {
//         console.log("request interceptor error：" + error);
//         Promise.reject(error);
//     }
// );
//
// // respone interceptors
// service.interceptors.response.use(
//     (response) => {
//         Toast.clear();
//         const res = response.data;
//         if (res.code !== "1000") {
//             Toast.fail(res.msg || res.message);
//
//             if (res.code === -1) {
//                 store.dispatch("Logout");
//             }
//             return Promise.reject(res);
//         } else {
//             res.status = true;
//
//             const url = response.config.url;
//             console.groupCollapsed(`%c 接口地址  ${url}`, "background:yellow;");
//             console.info(`请求报文 ==>`, response.config.data);
//             console.info(`返回数据 ==>`, response.data);
//             console.groupEnd();
//             return res;
//         }
//     },
//     (error) => {
//         if (error && error.response && error.response.status) {
//             Toast.clear();
//             switch (error.response.status) {
//                 case 403:
//                     Toast.fail(error.response.data.msg || "Token过期");
//                     break;
//                 case 500:
//                     Toast.fail(error.response.data.msg);
//                     break;
//                 case 404:
//                     Toast.fail(error.response.data.msg);
//                     break;
//                 default:
//                     break;
//             }
//         }
//         return Promise.reject(error);
//     }
// );
//
// export default service;
