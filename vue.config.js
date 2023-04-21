module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = "ADMIN | " + process.env.VUE_APP_TITLE;
        return args;
      })
  },
  lintOnSave: false
}
