import { configPropertyMap, ConfigPropertyName } from '../shared/configPropertyMap'
import { inject } from "vue";



export function useGlobalProps<T>(name: ConfigPropertyName) {
  return inject<T | undefined>(configPropertyMap[name].key, void 0)
}
