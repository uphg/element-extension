import { configMap, ConfigPropKeys } from "../shared/configProviderKeys";
import { inject } from "vue";

export function useGlobalProps<T>(key: ConfigPropKeys) {
  return inject<T | undefined>(configMap[key], void 0)
}
