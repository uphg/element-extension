import { h, ref, SetupContext } from "vue"
import { Switch } from "element-ui"
import { SwitchProps, GlobalSwitchProps } from "./switchProps"
import { ElSwitch } from "../../../../types/_element-ui"
import { useComponentProps, UseComponentParamsOptions } from "../../../composables/useComponentProps"
import { globalSwitchPropNames } from "../../../shared/configPropertyMap"
import { ObjectLike } from "../../../../types/_common"

const _propNames = ['disabled', 'name']

export function useSwitch<T extends ObjectLike>(
  props: SwitchProps | T,
  context?: SetupContext<{}>,
  options?: UseComponentParamsOptions<SwitchProps | ObjectLike, GlobalSwitchProps>
) {
  const { handleProps, handleRef: _handleRef } = options || {}
  const elSwitch = ref<ElSwitch | null>(null)
  const propNames = options?.status === 1 ? _propNames : ['value', ..._propNames]
  const { createProps } = useComponentProps(props, 'switch', { propNames, globalPropNames: globalSwitchPropNames, handleProps })
  
  const handleRef = (_handleRef || ((el: ElSwitch) => elSwitch.value = el)) as unknown as string
  const on = context ? {
    input(value: string | number | boolean) {
      context.emit('input', value)
    },
    change(value: string | number | boolean) {
      context.emit('change', value)
    }
  } : options?.on

  return {
    expose: {
      get elSwitch() {
        return elSwitch.value
      },
      focus() {
        elSwitch.value?.focus()
      }
    },
    render: () => h(Switch, { ref: handleRef, props: createProps(), on })
  }
}