import { ConfigPropertyName } from "../shared/configPropertyMap";
import { useGlobalProps } from "./useGlobalProps"
import { withDefaultProps } from "../utils/withDefaultProps";
import { ObjectLike } from "../types/object-like";
import pick from "../utils/pick";

type ComponentPropsOptions<Props, GlobalProps> = {
  propNames: string[];
  globalPropNames: string[];
  handleProps?: HandleProps<Partial<Props>, GlobalProps>
}

export type UseComponentParamsOptions<Props, GlobalProps> = {
  handleProps: HandleProps<Props, GlobalProps>
}

export interface HandleProps<Props, GlobalProps> {
  (props: Props, globalProps?: GlobalProps): () => Props
}

export function useComponentProps<Props extends ObjectLike, GlobalProps extends ObjectLike>(
  props: Props,
  configPropertyName: ConfigPropertyName,
  options: ComponentPropsOptions<Props, GlobalProps>
) {
  const { propNames: _propNames, globalPropNames, handleProps } = options || {}
  const globalProps = useGlobalProps<GlobalProps>(configPropertyName)
  const propNames = globalProps ? _propNames : [..._propNames, ...globalPropNames]

  const createProps = typeof handleProps === 'function'
    ? handleProps(props, globalProps)
    : () => ({ ...pick(props, propNames), ...withDefaultProps(props, globalProps, globalPropNames) }) as Props
  return { createProps, globalProps }
}