const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  outputDir: 'design',
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  productionSourceMap: false,
  assetsDir: 'static',
  configureWebpack: {
    performance: {
      hints: false
    },
    output: {
      library: 'design'
    },
    resolve: {
      extensions: ['.js', '.vue', '.json', '.css'],
      alias: {
        '@': resolve("src"),
        'views': resolve("src/views"),
        'utils': resolve("src/utils"),
        'assets': resolve("src/assets"),
        'packages': resolve("src/packages"),
        'config': resolve("src/config"),
        'components': resolve("src/components")
      }
    }
  },
  chainWebpack(config) {
    // 配置svg
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
