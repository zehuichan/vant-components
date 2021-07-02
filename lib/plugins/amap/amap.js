// const url = `//webapi.amap.com/maps?v=1.4.13&key=您申请的key值&callback=initAMap`
const url = `//webapi.amap.com/maps?v=2.0&key=71f33b048d691bdc407961696a276b24&callback=initAMap`

export default function amap() {
  return new Promise((resolve, reject) => {
    if (window.AMap) {
      resolve(window.AMap)
    } else {
      const script = document.createElement('script')
      script.src = url
      script.onerror = reject
      document.head.appendChild(script)
    }
    window.initAMap = () => {
      resolve(window.AMap)
    }
  })
}
