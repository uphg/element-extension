type PickObj = {
  [key: string]: any
}

function basePickBy(obj: PickObj, keys: string[], callback: (item: any, key: string, obj: PickObj) => undefined | boolean) {
  let index = -1
  const length = keys.length
  const result: PickObj = {}

  while (++index < length) {
    const key = keys[index]
    if (callback(obj[key], key, obj)) {
      result[key] = obj[key]
    }
  }

  return result
}

export default basePickBy