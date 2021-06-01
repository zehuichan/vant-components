// with polyfills
import 'core-js/stable'
import '@vant/touch-emulator'

import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Vant from 'vant'
import 'vant/lib/index.css'

// global lib
import VComponents from '../lib'

// 全量引入使用
Vue.use(Vant)
Vue.use(VComponents)

Vue.config.productionTip = false
console.log('Vue', Vue.version)
console.log('Vant', Vant.version)
console.log('VComponents', VComponents.version)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
