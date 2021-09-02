// 应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid），snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且，即使在未关注的情况下，只要用户授权，也能获取其信息）
const SCOPES = ['snsapi_base', 'snsapi_userinfo']

function Auth(options) {
  if (!options.appid) {
    throw new Error('appid must not be null | undefined')
  }
  this.init(options)
}

Auth.prototype = {
  init(options) {
    const vm = this
    vm.appid = options.appid
    vm.state = setState()
    vm.scope = SCOPES[1]
    vm.redirect_uri = null
    vm.code = null

    setCode(vm)
  },
  setRedirect(redirect_uri) {
    const { protocol, host, pathname, hash } = window.location
    const _redirect_uri = redirect_uri || `${protocol}//${host}${pathname}${hash}`
    this.redirect_uri = encodeURIComponent(_redirect_uri)
  },
  doRedirect(vm) {
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appid}&redirect_uri=${this.redirect_uri}&response_type=code&scope=${this.scope}&state=${this.state}#wechat_redirect`
  },
}

function setState(vm) {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

function setCode(vm) {
  const json = getQueryObject(window.location.search)
  vm.code = json && json.code
}

function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

export default Auth