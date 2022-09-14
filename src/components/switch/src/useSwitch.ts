import { h, ref, SetupContext } from "vue"
import { Switch } from "element-ui"
import { SwitchProps } from "./switchProps"
import { GlobalSwitchProps } from "../../config-provider/src/configProviderProps"
import { ElSwitch } from "../../../types/element-components"
import { withDefaultProps } from "../../../utils/withDefaultProps";
import { useGlobalProps } from "../../../composables/useGlobalProps"
import pick from "../../../utils/pick"
import { UseComponentOptions } from "../../../types/use-component-options"

const propNames = ['value', 'disabled', 'name']
const globalPropNames = ['width', 'activeIconClass', 'inactiveIconClass', 'activeText', 'inactiveText', 'activeValue', 'inactiveValue', 'activeColor', 'inactiveColor', 'validateEvent']

function useComponentProps<T, P>(props, options) {
  const { configPropertyName, propNames, globalPropNames, attrNames, globalAttrNames, handleProps, handleAttrs, context } = options || {}
  const globalProps = useGlobalProps<P>(configPropertyName)
  const createProps = handleProps && typeof handleProps === 'function' ? () => handleProps(props, globalProps!) : () => ({
    ...pick(props, propNames),
    ...withDefaultProps(props, globalProps, globalPropNames)
  })
  let createAttrs = null
  if (attrNames || attrNames && globalAttrNames) {
    createAttrs = handleAttrs && typeof handleAttrs === 'function' ? () => handleAttrs(props, globalProps) : () => ({
      ...pick(context.attrs, attrNames),
      ...withDefaultProps(context.attrs, globalProps, globalAttrNames)
    })
  }
  
  return createAttrs ? { createProps, createAttrs } : { createProps }
}

export function useSwitch(props: SwitchProps, context: SetupContext<{}>, options?: UseComponentOptions<SwitchProps, GlobalSwitchProps>) {
  const { handleProps, handleAttrs } = options || {}
  const elSwitch = ref<ElSwitch | null>(null)
  const globalSwitchProps = useGlobalProps<GlobalSwitchProps>('switch')

  const createProps = handleProps && typeof handleProps === 'function' ? () => handleProps(props, globalSwitchProps!) : () => ({
    ...pick(props, propNames),
    ...withDefaultProps(props, globalSwitchProps, globalPropNames)
  })

  const setRef = function(el: ElSwitch) {
    elSwitch.value = el
  } as unknown as string
  const input = (value: string | number | boolean) => {
    context.emit('input', value)
  }
  const change = (value: string | number | boolean) => {
    context.emit('change', value)
  }

  return {
    expose: {
      get elSwitch() {
        return elSwitch.value
      },
      focus() {
        elSwitch.value?.focus()
      }
    },
    render: () => h(Switch, {
      ref: setRef,
      props: createProps(),
      on: { input, change }
    })
  }
}