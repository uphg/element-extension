import isArray from "./isArray";

function map(obj, callback) {
  if(isArray(obj)) {
    const length = obj.length || 0
    const result = new Array(length)
    let index = -1
    while (++index < length) {
      result[index] = callback(obj[index], index, obj)
    }
    return result
  } else {
    const keys = Object.keys(obj)
    const length = keys.length
    const result = new Array(length)
    let index = -1
    while (++index < length) {
      const key = keys[index]
      result[index] = callback(obj[key], key, obj)
    }
    return result
  }
}