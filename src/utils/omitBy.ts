import basePickBy from "./basePickBy"

function omitBy(obj: object, callback: (item: any, key: string, obj: object) => undefined | boolean) {
  const keys = Object.keys(obj)
  return basePickBy(obj, keys, (item, key, obj) => !callback(item, key, obj))
}

export default omitBy