module.exports = {
  configureWebpack: {
    resolve: {
      alias: { //配置别名，在vue组件中引用时，不用去../寻找路径，直接用文件夹名
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}

