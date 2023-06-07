import { resolve } from "./build/webpack.base.conf";
import config from "./src/utils/config"
module.exports = {
  productionSourceMap:false,
  // 关闭ESLINT校验工具
  lintOnSave: false,
  // 
  configureWebpack: {
    resolve: {
        alias: {
          '@':resolve('src'),
        }  
    }
  },
  // 配置代理跨域
    devServer: {
        host:'0.0.0.0', //可以忽略不写
        port: 35444,//它是用来修改你打开后的端口号的
        open: true,//值为 true的话，项目启动时自动打开到浏览器里边， false不会打开
        proxy: {
          '/':{
            target: 'http://172.29.43.104',
            changeOrgin:true
          },
          '/api': {
            target:'https://smms.app',
            changeOrgin: true,
          }
        }
    },
};
