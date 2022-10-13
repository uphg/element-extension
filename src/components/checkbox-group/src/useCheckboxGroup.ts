import { h, ref, SetupContext } from "vue"
import { Checkbox as _Checkbox, CheckboxButton, CheckboxGroup } from "element-ui"
import { ElCheckboxGroup } from "element-ui/types/checkbox-group"
import { CheckboxGroupOption, checkboxGroupBaseProps, CheckboxGroupProps, GlobalCheckboxGroupProps, globalCheckboxGroupProps } from "./checkboxGroupProps"
import { useComponentProps, UseComponentParamsOptions } from "../../../composables/useComponentProps"
import { ObjectLike } from "../../../../types/_common"
import { createNames, isUndefined, keys } from "../../../utils"
import { VNode } from "vue/types/umd"

export function useCheckboxGroup<T extends ObjectLike>(
  props: CheckboxGroupProps | T,
  context?: SetupContext<{}>,
  options?: UseComponentParamsOptions<CheckboxGroupProps | ObjectLike, GlobalCheckboxGroupProps>
) {
  const { handleProps, handleRef: _handleRef } = options || {}
  const elCheckboxGroup = ref<ElCheckboxGroup | null>(null)
  const propNames = createNames(checkboxGroupBaseProps, options?.status)
  const globalPropNames = keys(globalCheckboxGroupProps)
  const { createProps, globalProps } = useComponentProps(props,'form', { propNames, globalPropNames, handleProps })
  const handleRef = (
    _handleRef || ((el: ElCheckboxGroup) => elCheckboxGroup.value = el)
  ) as unknown as string

  const on = context?.emit ? {
    input(value: string | number | boolean) {
      context.emit('input', value)
    },
    change(value: string | number | boolean) {
      context.emit('change', value)
    }
  } : options?.on

  const Checkbox = (isUndefined(props.withButton) ? globalProps?.withButton : props.withButton) ? CheckboxButton : _Checkbox
  const withBorder = (isUndefined(props.withBorder) ? globalProps?.withBorder : props.withBorder) as boolean

  const renderItemChildren = context?.slots.options
    ? ((item: CheckboxGroupOption) => context.slots.options!(item))
    : ((item: CheckboxGroupOption) => item.label)

  const renderItem = (item: CheckboxGroupOption) => h(Checkbox, {
    props: {
      label: item.value,
      name: item.name,
      disabled: item.disabled,
      border: item.border || withBorder
    }
  }, renderItemChildren(item) as VNode[])

  return {
    render: () => h(CheckboxGroup, {
      ref: handleRef,
      props: createProps(),
      on,
    }, props.options?.map(renderItem))
  }
}