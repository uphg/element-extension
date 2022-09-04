import { ObjectLike } from "../types/object-like"

export function generateProps<T extends ObjectLike>(props: T, keys: (keyof T | string)[]) {
  const result: T | object = {}
  keys.forEach((key) => {
    (result as T)[key] = props[key]
  })
  return result
}