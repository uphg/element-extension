function map<T>(
  array: T[],
  fn: (item: T, index: number, array: T[]) => unknown,
) {
  let index = -1
  const result = []
  while (++index) {
    result.push(fn(array[index], index, array))
  }

  return result
}

export default map