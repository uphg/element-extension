import { toString } from '../utils'
import { InputExclude } from '../types/input'

export function createExclude(exclude: InputExclude) {
  return typeof exclude === 'number' ? toString(exclude) : exclude
}
