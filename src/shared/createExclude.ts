import { excludeMap } from './excludeMap'
import { toString } from '../utils'
import { InputExclude, InputBaseExcludes } from '../types/input'

export function createExclude(exclude: InputExclude) {
  const excludeKeys = Object.keys(excludeMap)
  if (typeof exclude === 'string' && excludeKeys.includes(exclude)) {
    return excludeMap[exclude as InputBaseExcludes]
  }

  return typeof exclude === 'number' ? toString(exclude) : exclude
}
