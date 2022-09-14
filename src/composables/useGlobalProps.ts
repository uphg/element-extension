import { configPropertyMap } from '../shared/configPropertyMap'
import { inject } from "vue";

type ConfigPropertyName = keyof (typeof configPropertyMap)

export function useGlobalProps<T>(name: ConfigPropertyName) {
  return inject<T | undefined>(configPropertyMap[name].key, void 0)
}
