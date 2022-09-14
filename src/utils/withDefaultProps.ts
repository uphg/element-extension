import { ObjectLike } from "../types/object-like"

export function withDefaultProps<T extends ObjectLike>(props: ObjectLike, defaults: T | undefined, keys: string[]) {
  const result: T | object = {}
  if (!defaults) return result
  keys.forEach((key) => {
    (result as ObjectLike)[key] = props[key] !== void 0 ? props[key] : defaults?.[key] || void 0
  })
  return result as T
}