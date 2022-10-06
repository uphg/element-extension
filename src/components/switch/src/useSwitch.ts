import { h, ref, SetupContext } from "vue"
import { Switch } from "element-ui"
import { SwitchProps, GlobalSwitchProps, switchBaseProps, globalSwitchProps } from "./switchProps"
import { ElSwitch } from "../../../../types/_element-ui"
import { useComponentProps, UseComponentParamsOptions } from "../../../composables/useComponentProps"
import { ObjectLike } from "../../../../types/_common"
import { createNames, keys } from "../../../utils"

export function useSwitch<T extends ObjectLike>(
  props: SwitchProps | T,
  context?: SetupContext<{}>,
  options?: UseComponentParamsOptions<SwitchProps | ObjectLike, GlobalSwitchProps>
) {
  const { handleProps, handleRef: _handleRef } = options || {}
  const elSwitch = ref<ElSwitch | null>(null)
  const propNames = createNames(switchBaseProps, options?.status)
  const globalPropNames = keys(globalSwitchProps)
  const { createProps } = useComponentProps(props, 'switch', { propNames, globalPropNames, handleProps })
  
  const handleRef = (_handleRef || ((el: ElSwitch) => elSwitch.value = el)) as unknown as string
  const on = context?.emit ? {
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