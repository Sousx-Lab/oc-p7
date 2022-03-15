export function isEmptyObject(value) {
  if (value instanceof Object  && value.constructor === Object) {
    return Object.keys(value).length === 0
  }
  return true
}