import { configPropertyMap } from '../shared/configPropertyMap'
import { inject } from "vue";

type ConfigPropertyNames = keyof (typeof configPropertyMap)

export function useGlobalProps<T>(name: ConfigPropertyNames) {
  return inject<T | undefined>(configPropertyMap[name].key, void 0)
}
