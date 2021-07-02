const wx = require('./jweixin-1.6.0')

function plugin(Vue) {
  if (plugin.installed) {
    return
  }
  Vue.prototype.$wx = wx
}

export default plugin