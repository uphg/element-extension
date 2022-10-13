import { h, ref, SetupContext } from "vue"
import { RadioGroup, RadioButton, Radio as _Radio } from "element-ui"
import { ElRadioGroup } from "element-ui/types/radio-group"
import { RadioGroupProps, globalRadioGroupBaseProps, GlobalRadioGroupProps, RadioGroupOption, radioGroupBaseProps } from "./radioGroupProps"
import { useComponentProps, UseComponentParamsOptions } from "../../../composables/useComponentProps"
import { ObjectLike } from "../../../../types/_common"
import { createNames, isUndefined, keys } from "../../../utils"
import { VNode } from "vue/types/umd"

export function useRadioGroup<T extends ObjectLike>(
  props: RadioGroupProps | T,
  context?: SetupContext<{}> | null,
  options?: UseComponentParamsOptions<RadioGroupProps | ObjectLike, GlobalRadioGroupProps>
) {
  const { handleProps, handleRef: _handleRef } = options || {}
  const elRadioGroup = ref<ElRadioGroup | null>(null)
  const propNames = createNames(radioGroupBaseProps, options?.status)
  const globalPropNames = keys(globalRadioGroupBaseProps)
  const { createProps, globalProps } = useComponentProps(props, 'form', { propNames, globalPropNames, handleProps })
  const handleRef = (_handleRef || ((el: ElRadioGroup) => elRadioGroup.value = el)) as unknown as string

  const on = context?.emit ? {
    input: (value: string | number | boolean) => {
      context.emit('input', value)
    },
    change: (value: string | number | boolean) => {
      context.emit('change', value)
    }
  } : options?.on

  const withButton = isUndefined(props.withButton) ? globalProps?.withButton : props.withButton
  const withBorder = (isUndefined(props.withBorder) ? globalProps?.withBorder : props.withBorder) as boolean

  const Radio = withButton ? RadioButton : _Radio

  const renderItemChildren = context?.slots.options
  ? ((item: RadioGroupOption) => context.slots.options!(item))
  : ((item: RadioGroupOption) => item.label)

  const renderItem = (item: RadioGroupOption) => h(Radio, {
    props: {
      label: item.value,
      name: item.name,
      disabled: item.disabled,
      border: item.border || withBorder
    }
  }, renderItemChildren(item) as VNode[])

  return {
    render: () => h(RadioGroup, {
      ref: handleRef,
      props: createProps(),
      on
    }, props.options?.map(renderItem))
  }
}