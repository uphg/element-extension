export interface ObjectLike<T=any> {
  [key: string | number | symbol]: T
}