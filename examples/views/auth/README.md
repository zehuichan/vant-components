### 介绍

前端微信公众号授权食用方法，支持区分 `appid`。

### 前置条件

```
// .env.development
NODE_ENV = 'development'

# appid
VUE_APP_WECHAT_APPID = '测试appid'

// .env.production
NODE_ENV = 'development'

# appid
VUE_APP_WECHAT_APPID = '产线appid'
```

```js
// main.js
import Vue from 'vue'

import Auth from 'vantui-components/lib/plugins/auth'

Vue.use(Auth, {
  appid: process.env.VUE_APP_WECHAT_APPID
})
```

### 用法

```js
router.beforeEach(async (to, from, next) => {

  const loginStatus = store.getters.loginStatus

  switch (+loginStatus) {
    case 0:
      await store.dispatch('user/setLoginStatus', 1)
      Vue.prototype.$auth.setRedirect()
      break
    case 1:
      try {
        await store.dispatch('user/setLoginStatus', 2)
        next()
      } catch (err) {
        await store.dispatch('user/setLoginStatus', 0)
        next('/404')
      }
      break
    case 2:
      // determine whether the user has logged in
      const hasToken = cache.getItem(ACCESS_TOKEN)
      if (hasToken) {
        if (to.path === '/login') {
          // if is logged in, redirect to the home page
          next({ path: '/' })
          NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
        } else {
          const userInfo = store.getters.userInfo
          if (userInfo) {
            next()
          } else {
            Vue.prototype.$auth.setRedirect('/login')
          }
        }
      } else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) {
          // in the free login whitelist, go directly
          next()
        } else {
          // other pages that do not have permission to access are redirected to the login page.
          Vue.prototype.$auth.setRedirect('/login')
        }
      }
      break
  }
})
```
