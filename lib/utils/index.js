const hasOwnProperty = Object.prototype.hasOwnProperty

export function noop() {
}

export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key)
}

export function isEmpty(val) {
  // null or undefined
  if (val == null) return true

  if (typeof val === 'boolean') return false

  if (typeof val === 'number') return !val

  if (val instanceof Error) return val.message === ''

  switch (Object.prototype.toString.call(val)) {
    // String or Array
    case '[object String]':
    case '[object Array]':
      return !val.length

    // Map or Set or File
    case '[object File]':
    case '[object Map]':
    case '[object Set]': {
      return !val.size
    }
    // Plain Object
    case '[object Object]': {
      return !Object.keys(val).length
    }
  }

  return false
}

// 判断类型
export function is(val, type) {
  const typeArr = Array.isArray(type) ? type : [type]
  const valType = Object.prototype.toString.call(val)
  return typeArr.some(type => `[object ${type}]` === valType)
}
