import { ObjectLike } from "../types/object-like"

const empty = void 0

export function withDefaultProps<T extends ObjectLike>(props: ObjectLike, defaults?: T, keys?: string[]) {
  const result: T | ObjectLike = {}
  if (!defaults) return result
  keys?.forEach((key) => {
    const value = props[key] !== empty ? props[key] : defaults?.[key]
    value !== empty && (result[key] = value)
  })
  return result as T
}