import { h, ref, SetupContext } from "vue"
import { Checkbox as _Checkbox, CheckboxButton, CheckboxGroup } from "element-ui"
import { ElCheckboxGroup } from "element-ui/types/checkbox-group"
import { CheckboxGroupOption, CheckboxGroupProps, GlobalCheckboxGroupProps } from "./checkboxGroupProps"
import { useComponentProps, UseComponentParamsOptions } from "../../../composables/useComponentProps"
import { globalCheckboxGroupPropNames } from "../../../shared/configPropertyMap"
import { ObjectLike } from "../../../../types/_common"
import isNil from "../../../utils/isNil"

const _propNames = ['disabled']

export function useCheckboxGroup<T extends ObjectLike>(
  props: CheckboxGroupProps | T,
  context?: SetupContext<{}>,
  options?: UseComponentParamsOptions<CheckboxGroupProps | ObjectLike, GlobalCheckboxGroupProps>
) {
  const { handleProps, handleRef: _handleRef } = options || {}
  const elCheckboxGroup = ref<ElCheckboxGroup | null>(null)
  const propNames = options?.status === 1 ? _propNames : ['value', ..._propNames]
  const { createProps, globalProps } = useComponentProps(props,'form', { propNames, globalPropNames: globalCheckboxGroupPropNames, handleProps })
  const handleRef = (
    _handleRef || ((el: ElCheckboxGroup) => elCheckboxGroup.value = el)
  ) as unknown as string

  const on = context ? {
    input(value: string | number | boolean) {
      context.emit('input', value)
    },
    change(value: string | number | boolean) {
      context.emit('change', value)
    }
  } : options?.on

  const Checkbox = (isNil(props.withButton) ? globalProps?.withButton : props.withButton) ? CheckboxButton : _Checkbox
  const withBorder = (isNil(props.withBorder) ? globalProps?.withBorder : props.withBorder) as boolean

  return {
    render: () => h(CheckboxGroup, {
      ref: handleRef,
      props: createProps(),
      on
    }, props.options?.map((item: CheckboxGroupOption) => h(Checkbox, {
      props: {
        label: item.value,
        name: item.name,
        disabled: item.disabled,
        border: item.border || withBorder
      }
    }, [item.label as string])))
  }
}