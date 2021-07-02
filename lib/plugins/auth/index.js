import Auth from './auth'

const install = (Vue, opts = {}) => {
  if (install.installed) {
    return
  }

  Vue.prototype.$auth = new Auth(opts)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}

