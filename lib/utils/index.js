const hasOwnProperty = Object.prototype.hasOwnProperty

export function noop() {
}

export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key)
}