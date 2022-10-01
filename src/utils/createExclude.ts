import { toString } from '../utils'

export function createExclude(exclude: string | number | RegExp) {
  return typeof exclude === 'number' ? toString(exclude) : exclude
}
