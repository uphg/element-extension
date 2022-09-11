import { ObjectLike } from "../types/object-like"

function pick<T extends ObjectLike>(obj: T, keys: string[]) {
  let index = -1
  const length = keys.length || 0
  const result: T | ObjectLike = {}

  while (++index < length) {
    const key = keys[index]
    result[key] = obj[key]
  }

  return result
}

export default pick