type ObjectLike = {
  [key: string]: any
}

export function generateProps(defaultProps: ObjectLike, currentProps: ObjectLike, globalProps: ObjectLike) {
  const result: ObjectLike | object = {}
  const propNames = Object.keys(defaultProps)
  propNames.forEach((prop) => {
    (result as ObjectLike)[prop] = currentProps[prop] || globalProps[prop] || defaultProps[prop]?.default
  })
  return result
}

generateProps({ hi: 1 }, { hi: '' }, { hi: '你好' })

console.log()
