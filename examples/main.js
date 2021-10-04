// with polyfills
import 'core-js/stable'
import '@vant/touch-emulator'

import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Vant from 'vant'
import 'vant/lib/index.css'

import hljs from 'highlight.js'
import 'highlight.js/styles/default.css'

// global lib
import VComponents from '../lib'
import DemoComponents from './components'

import './styles/less/index.less' // global css

import * as filters from './filters' // global filters

// 全量引入使用
Vue.use(Vant)
Vue.use(hljs.vuePlugin)
Vue.use(VComponents)
Vue.use(DemoComponents)

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
console.log('Vue', Vue.version)
console.log('Vant', Vant.version)
console.log('@vcomponetns/vant-ui', `Published ${APP_VERSION}-${GIT_HASH} @zehuichan`)
console.log('@vcomponetns/vant-ui', `Build date: ${BUILD_DATE} @zehuichan`)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
