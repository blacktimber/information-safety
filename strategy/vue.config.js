const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
	publicPath:process.env.BASE_URL==="production" ? "/":"/",
})

// const {defineConfig} = require('@vue/cli-service')
// module.exports = defineConfig({
// 	publicPath:process.env.NODE_ENV === 'production' ? './' : '/',
//   devServer: {
//     proxy: {
//           '/api': {
//             target: 'http://192.168.88.226:8001', 
//             ws: true, //代理websockets
//             changeOrigin: true, 
//             pathRewrite: {
//               '^/api': '',
//             },
//           },
//         },
//    }
// })