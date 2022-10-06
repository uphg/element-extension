const _hasOwnProperty = Object.prototype.hasOwnProperty

function hasOwnProperty<T = any>(object: T, key: string | number | symbol) {
  return object !== null && object !== void 0 && _hasOwnProperty.call(object, key)
}

export default hasOwnProperty
