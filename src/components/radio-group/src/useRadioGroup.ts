import { h, ref, SetupContext } from "vue"
import { RadioGroup, RadioButton, Radio as _Radio } from "element-ui"
import { ElRadioGroup } from "element-ui/types/radio-group"
import { RadioGroupProps, GlobalRadioGroupProps, RadioGroupOption } from "./radioGroupProps"
import { useComponentProps, UseComponentParamsOptions } from "../../../composables/useComponentProps"
import { globalRadioGroupPropNames } from "../../../shared/configPropertyMap"
import { empty } from "../../../shared/_commonProps"
import { ObjectLike } from "../../../types/object-like"

const propNames = ['value', 'disabled', 'options'] // el props

export function useRadioGroup<T extends ObjectLike>(
  props: RadioGroupProps | T,
  context?: SetupContext<{}> | null,
  options?: UseComponentParamsOptions<RadioGroupProps | ObjectLike, GlobalRadioGroupProps>
) {
  const { handleProps } = options || {}
  const elRadioGroup = ref<ElRadioGroup | null>(null)
  const { createProps, globalProps } = useComponentProps(props, 'form', { propNames, globalPropNames: globalRadioGroupPropNames, handleProps })
  const setRef = ((el: ElRadioGroup) => elRadioGroup.value = el) as unknown as string

  const on = context ? {
    input: (value: string | number | boolean) => {
      context.emit('input', value)
    },
    change: (value: string | number | boolean) => {
      context.emit('change', value)
    }
  } : empty

  const Radio = (props.withButton || globalProps?.withButton) ? RadioButton : _Radio
  const withBorder = (props.withBorder || globalProps?.withBorder)

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