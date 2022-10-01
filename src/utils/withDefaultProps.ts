import { ObjectLike } from "../../types/_common"

const empty = void 0

export function withDefaultProps<T extends ObjectLike>(props: ObjectLike, _defaults: T | undefined, keys?: string[]) {
  const result: T | ObjectLike = {}
  const defaults: ObjectLike = _defaults || {}
  keys?.forEach((key) => {
    const value = props[key] !== empty ? props[key] : defaults?.[key]
    value !== empty && (result[key] = value)
  })
  return result as T
}