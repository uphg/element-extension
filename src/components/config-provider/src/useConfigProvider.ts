import { provide, SetupContext } from "vue";
import { ConfigProviderProps } from "./configProviderProps";
import { each } from "../../../utils/each";
import { ObjectLike } from "../../../types/common";
import { configPropertyMap, ConfigPropertyMap } from "../../../shared/configPropertyMap";
import { empty } from "../../../shared/_commonProps";

type ConfigPropertyItem = ConfigPropertyMap[keyof ConfigPropertyMap]

export function useConfigProvider(props: ConfigProviderProps, context?: SetupContext<{}>) {
  const provideProps: ObjectLike = {}
  each<ConfigPropertyItem>(configPropertyMap, (item, propName) => {
    const currentProps = (props as ObjectLike)[propName]
    const tempProps: ObjectLike | undefined = currentProps ? {} : empty
    each<string>(item.propNames, (key) => {
      const value = (currentProps as ObjectLike)?.[key]
      if (value) {
        tempProps![key] = value
      }
    })
    if (tempProps) {
      provideProps[propName] = tempProps
      provide<ObjectLike>(item.key, tempProps)
    }
  })

  console.log('provideProps')
  console.log(provideProps)
  return context && (() => context.slots.default?.())
}
