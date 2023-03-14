const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
	assetsDir: 'static',
	    parallel: false,
	    publicPath: './',
  transpileDependencies: true,
  runtimeCompiler: true,
  devServer: {
    // host: '192.168.137.1',
    // host: '127.0.0.1',
	host:'0.0.0.0',
    open: true,
    port: 8004,
	// proxy: {
	//     '/getCurrentCityName': {
	//       target: 'http://530008q6d3.zicp.fun:14288', //目标URL
	//       changeOrigin: true,
	//       rewrite: path => path.replace(/^\/api/, '')
	//     }
	//  }
    proxy: {
      '/api': {
        target: 'http://192.168.88.225:8202', //接口域名
        // target: 'http://43.143.197.144:8201', //接口域名
        // target: 'https://xcx.jinchenghealth.com:8002', //接口域名
        changeOrigin: true,       //是否跨域
        ws: true,            //是否代理 websockets
        secure: true,          //是否https接口
        pathRewrite: {         //路径重置
          '^/api': ''
        }
      }
    }
  }
  // pluginOptions: {
  //     'style-resources-loader': {
  //         preProcessor: 'sass',
  //         patterns: []
  //     }
  // },
  // css: {
  //     loaderOptions: {
  //         sass: {
  //             prependData: `@import "~@/assets/scss/_variable.scss";`
  //         }
  //     }
  // }
})
