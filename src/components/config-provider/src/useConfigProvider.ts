import { configMap, ConfigPropKeys } from "../../../shared/configProviderKeys";
import { provide, SetupContext } from "vue";
import { ConfigProviderProps } from "./configProviderProps";

export function useConfigProvider(props: ConfigProviderProps, context: SetupContext<{}>) {
  
  (Object.keys(configMap) as ConfigPropKeys[]).forEach((key) => {
    provide(configMap[key], props[key])
  })

  return () => context.slots.default?.()
}