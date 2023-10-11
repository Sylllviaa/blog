const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/web': {
        target: 'http://localhost:7001',
        // pathRewrite: { '^/web': '' },//路径改写
      },
    }
  }
})
