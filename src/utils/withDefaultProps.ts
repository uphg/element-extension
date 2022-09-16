import { ObjectLike } from "../types/object-like"

const empty = void 0

export function withDefaultProps<T extends ObjectLike>(props: ObjectLike, defaults?: T, keys?: string[]) {
  const result: T | ObjectLike = {}
  if (!defaults) return result
  keys?.forEach((key) => {
    result[key] = props[key] !== empty ? props[key] : defaults?.[key] || empty
  })
  return result as T
}