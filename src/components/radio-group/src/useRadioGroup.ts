import { h, ref, SetupContext } from "vue"
import { RadioGroup, RadioButton, Radio as _Radio } from "element-ui"
import { ElRadioGroup } from "element-ui/types/radio-group"
import { RadioGroupProps, GlobalRadioGroupProps, RadioGroupOption } from "./radioGroupProps"
import { useComponentProps, UseComponentParamsOptions } from "../../../composables/useComponentProps"
import { globalRadioGroupPropNames } from "../../../shared/configPropertyMap"
import { ObjectLike } from "../../../types/object-like"
import isNil from "../../../utils/isNil"

const _propNames = ['disabled', 'options'] // el props

export function useRadioGroup<T extends ObjectLike>(
  props: RadioGroupProps | T,
  context?: SetupContext<{}> | null,
  options?: UseComponentParamsOptions<RadioGroupProps | ObjectLike, GlobalRadioGroupProps>
) {
  const { handleProps, setRef: _setRef } = options || {}
  const elRadioGroup = ref<ElRadioGroup | null>(null)
  const propNames = options?.status === 1 ? _propNames : ['value', ..._propNames]
  const { createProps, globalProps } = useComponentProps(props, 'form', { propNames, globalPropNames: globalRadioGroupPropNames, handleProps })
  const setRef = (_setRef || ((el: ElRadioGroup) => elRadioGroup.value = el)) as unknown as string

  const on = context ? {
    input: (value: string | number | boolean) => {
      context.emit('input', value)
    },
    change: (value: string | number | boolean) => {
      context.emit('change', value)
    }
  } : options?.on

  const Radio = (isNil(props.withButton) ? globalProps?.withButton : props.withButton) ? RadioButton : _Radio
  const withBorder = (isNil(props.withBorder) ? globalProps?.withBorder : props.withBorder) as boolean

  return {
    render: () => h(RadioGroup, {
      ref: setRef,
      props: createProps(),
      on
    }, props.options?.map((item: RadioGroupOption) => h(Radio, {
      props: {
        label: item.value,
        name: item.name,
        disabled: item.disabled,
        border: item.border || withBorder
      }
    }, [item.label as string])))
  }
}