import { ObjectLike } from './interfaces'
import { Key } from './interfaces'
import getSymbols from './getSymobls'
import keys from '../keys'

function baseOmitBy<T>(object: ObjectLike | T, callback: (value: T, key: Key) => boolean) {
  const props: Key[] = keys(object).concat(getSymbols(object) as any)
  let index = -1
  const length = props.length
  const result: { [k: Key]: unknown } = {}
  while (++index < length) {
    const key = props[index]
    const value = (object as ObjectLike)[key]
    if (callback(value, key)) {
      continue
    }
    result[key] = value
  }
  return result
}

export default baseOmitBy
