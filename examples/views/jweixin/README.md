### 介绍

微信JSSDK食用方法。

### 前置条件

```js
// main.js
import Vue from 'vue'

import JWeixin from 'vantui-components/lib/plugins/jweixin'

Vue.use(JWeixin)
```

### 初始化

一般会放到 `store` 里面使用，这样会方便我到处调用。

```js
// store => app.js
const actions = {
  initWxConfig({ commit }) {
    return new Promise((resolve, reject) => {
      const url = encodeURIComponent(window.location.href.split('#')[0])
      // wxconfig 后端api
      wxconfig(url).then((res) => {
        const config = Object.assign({}, res, { debug: false })
        Vue.prototype.$wx.config(config)
        Vue.prototype.$wx.ready(() => {
          commit('SET_WECHAT_READY', true)
          resolve()
        })
        Vue.prototype.$wx.error((error) => {
          commit('SET_WECHAT_READY', false)
          reject()
        })
      }).catch((error) => {
        commit('SET_WECHAT_READY', false)
        reject()
      })
    })
  },
}

// 全局路由守卫
router.beforeEach(async (to, from, next) => {
  // 初始化微信jssdk
  if (!store.getters.wechatReady) {
    await store.dispatch('user/initWxConfig')
  }
})
```

### scanQRCode

```js
export default {
  methods: {
    scanQRCode() {
      this.$wx.scanQRCode({
        needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
          var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
        }
      })
    }
  }
}
```

### previewImage

```js
export default {
  methods: {
    previewImage({ path }) {
      const urls = this.files.map(item => item.path)
      this.$wx.previewImage({
        current: path,
        urls: urls
      })
    },
  }
}
```