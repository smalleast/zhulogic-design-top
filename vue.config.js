const env = process.env

const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  baseUrl: env.BASE_URL,
  assetsDir: "static",
  lintOnSave: false,
  productionSourceMap: false,
  configureWebpack() {
    const plugins = []
    return {
      plugins,
      externals: {
      },
      resolve: {
        extensions: [".js", ".vue", ".json", ".css", ".scss"],
        modules: [
          resolve('src'),
          resolve('public'),
          resolve('node_modules')
        ],
        alias: {
          src: resolve("src"),
          'components': resolve('src/components'),
        }
      }
    }
   
  },
  chainWebpack: config => {
    config.module
      .rule('eslint')
          .exclude
            .add(/public/)
  },
  devServer: {
    open: true,
    host: "0.0.0.0",
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      "/factory": {
        target: "http://test.zhulogic.com:8045",
        ws: true,
        changOrigin: true
      }
    },
    before: app => {}
  }
};
