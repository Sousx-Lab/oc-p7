export function isEmptyObject(value) {
  if (value instanceof Object  && value.constructor === Object) {
    return Object.keys(value).length === 0
  }
  return true
}

export function isValidHttpUrl(string) {
  try {
    new URL(string);
  } catch (_) {
    return false;  
  }
  return true
}