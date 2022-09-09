import { ObjectLike } from "src/types/object-like";
import isArray from "../isArray";

export function map(obj: ObjectLike | any[], callback: (item: ObjectLike | any, index: number | string, obj: ObjectLike) => ObjectLike) {
  if(isArray(obj)) {
    const length = obj.length || 0
    const result = new Array(length)
    let index = -1
    while (++index < length) {
      result[index] = callback((obj as ObjectLike)[index], index, obj)
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