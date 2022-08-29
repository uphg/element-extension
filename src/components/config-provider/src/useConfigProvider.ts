import { configMap } from "../../../shared/configProviderKeys";
import { provide, SetupContext } from "vue";
import { ConfigProviderProps, defaultProps } from "./configProviderProps";
import { each } from "../../../utils/each";
import { ObjectLike } from "../../../types/common";

export function useConfigProvider(props: ConfigProviderProps, context?: SetupContext<{}>) {
  const provideProps: ObjectLike = {}
  each<symbol>(configMap, (configKey, componentName) => {
    const currentProps = (props as ObjectLike)?.[componentName]
    const tempProps: ObjectLike = {}
    each<ObjectLike>((defaultProps as ObjectLike)[componentName], (defaultProp, propName) => {
      tempProps[propName] = currentProps?.[propName] || defaultProp
    })
    provideProps[componentName] = tempProps
    provide<ObjectLike>(configKey, tempProps)
  });

  return context && (() => context.slots.default?.())
}
