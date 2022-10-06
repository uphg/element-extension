import hasOwnProperty from '../hasOwnProperty'
import basePickBy from './basePickBy'
import { Key } from './interfaces'

function basePick(obj: unknown, keys: Key[]) {
  return basePickBy(obj, keys, (_value, key) => hasOwnProperty(obj, key))
}

export default basePick
