import { provide, SetupContext } from "vue";
import { ConfigProviderProps } from "./configProviderProps";
import { each } from "../../../utils/each";
import { ObjectLike } from "../../../types/common";
import { configPropertyMap, ConfigPropertyMap } from "../../../shared/configPropertyMap";

type ConfigPropertyItem = ConfigPropertyMap[keyof ConfigPropertyMap]

export function useConfigProvider(props: ConfigProviderProps, context?: SetupContext<{}>) {
  const provideProps: ObjectLike = {}
  each<ConfigPropertyItem>(configPropertyMap, (item, propName) => {
    const tempProps: ObjectLike = {}
    const currentProps = (props as ObjectLike)[propName]
    each<ObjectLike>(item.default as ObjectLike, (defaultValue, key) => {
      tempProps[key] = (currentProps as ObjectLike)?.[key] || defaultValue
    })
    provideProps[propName] = tempProps
    provide<ObjectLike>(item.key, tempProps)
  })
  console.log('provideProps')
  console.log(provideProps)
  return context && (() => context.slots.default?.())
}
