import '@vant/touch-emulator'

import Vue from 'vue'
import App from './App.vue'

import Vant from 'vant'
import 'vant/lib/index.css'

// global lib
import VComponents from '../packages'

// 全量引入使用
Vue.use(Vant)
Vue.use(VComponents)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
