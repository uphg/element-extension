import { ObjectLike } from "../../types/_common"
import { empty } from "../shared/commonProps"

export function withDefaultProps<T extends ObjectLike>(props: ObjectLike, _defaults: T | undefined, keys?: string[]) {
  const result: T | ObjectLike = {}
  const defaults: ObjectLike = _defaults || {}
  keys?.forEach((key) => {
    const value = props[key] !== empty ? props[key] : defaults?.[key]
    value !== empty && (result[key] = value)
  })
  return result as T
}
