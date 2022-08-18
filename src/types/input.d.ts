import { excludeMap } from '../shared/excludeMap'

export type InputBaseExcludes = keyof (typeof excludeMap)

export type InputExclude = InputBaseExcludes & ( string | number | RegExp)