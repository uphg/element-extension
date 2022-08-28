import { configMap, ConfigPropKeys } from "../../../shared/configProviderKeys";
import { provide, SetupContext } from "vue";
import { ConfigProviderProps, defaultProps, ConfigComponentPropNames } from "./configProviderProps";
import { isObject } from "../../../utils";

export function useConfigProvider(props: ConfigProviderProps, context: SetupContext<{}>) {
  
  (Object.keys(configMap) as ConfigPropKeys[]).forEach((key) => {
    const tempProps: { [key: string]: any } = {}
    Object.keys(defaultProps[key]).forEach((prop: string) => {
      // @ts-ignore
      tempProps[prop] = props[key][prop] ? props[key][prop] : defaultProps[key][prop]
    })
    provide(configMap[key], tempProps)
  })

  return () => context.slots.default?.()
}

function createConfigDefaultProps(defaults, props) {
  const result = {}
  const stack = [[defaults, result, props]]

  while (stack.length) {
    const part = stack.shift()
    const defaults = [0]
    const result = [1]
    const props = [2]
    const defaultKeys = Object.keys(defaults)
    defaultKeys.forEach((key) => {

      result[key] = props[key] || defaults[key]
      if (isObject(defaults[key])) {
        stack.push([defaults[key], result[key], props[key]])
      }
    })
    
  }

}