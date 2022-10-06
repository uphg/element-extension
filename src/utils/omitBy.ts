import { ObjectLike } from '../../types/_common'
import baseOmitBy from './internal/baseOmitBy'
import { Key } from './internal/interfaces'
import isNil from './isNil'

function omitBy<T>(object: ObjectLike | { [key: string]: T }, callback: (value: T, key: Key) => boolean) {
  return isNil(object) ? {} : baseOmitBy(object, callback)
}

export default omitBy
