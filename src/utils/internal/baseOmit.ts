import baseOmitBy from './baseOmitBy'
import { Key } from './interfaces'

function baseOmit(object: any, excludes: Key[]) {
  return baseOmitBy(object, (_value, key) => excludes.indexOf(key) !== -1)
}

export default baseOmit
