import amap from './amap'

function plugin(Vue) {
  if (plugin.installed) {
    return
  }
  Vue.prototype.$amap = amap
}

export default plugin