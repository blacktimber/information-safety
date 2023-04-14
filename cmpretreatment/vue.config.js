const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
	publicPath:process.env.BASE_URL==="production" ? "/":"/",
})

// const {defineConfig} = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   runtimeCompiler: true,
//   devServer: {
//     // host: '192.168.137.1',
//     host: '127.0.0.1',
//     open: true,
//     port: 8002,
//     proxy: {
//       '/api': {
//         // target: 'https://6043950n4x.oicp.vip:44960', //接口域名
//         // target: 'http://43.143.197.144:8201', //接口域名
// 		target: 'http://530008q6d3.zicp.fun:53327',
//         // target: 'https://xcx.jinchenghealth.com:8002', //接口域名
//         changeOrigin: true,       //是否跨域
//         ws: true,            //是否代理 websockets
//         secure: true,          //是否https接口
//         pathRewrite: {         //路径重置
//           // '^/api': ''
// 		   "^/proxy": "/"
//         }
//       }
//     },
//   }
//   // pluginOptions: {
//   //     'style-resources-loader': {
//   //         preProcessor: 'sass',
//   //         patterns: []
//   //     }
//   // },
//   // css: {
//   //     loaderOptions: {
//   //         sass: {
//   //             prependData: `@import "~@/assets/scss/_variable.scss";`
//   //         }
//   //     }
//   // }
// })
