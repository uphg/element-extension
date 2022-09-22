import { h, ref, SetupContext } from "vue"
import { Checkbox as _Checkbox, CheckboxButton, CheckboxGroup } from "element-ui"
import { ElCheckboxGroup } from "element-ui/types/checkbox-group"
import { CheckboxGroupOption, CheckboxGroupProps, GlobalCheckboxGroupProps } from "./checkboxGroupProps"
import { useComponentProps, UseComponentParamsOptions } from "../../../composables/useComponentProps"
import { ObjectLike } from "../../../types/object-like"
import { globalCheckboxGroupPropNames } from "../../../shared/configPropertyMap"
import isNil from "../../../utils/isNil"

const propNames = ['value', 'disabled']

export function useCheckboxGroup<T extends ObjectLike>(
  props: CheckboxGroupProps | T,
  context?: SetupContext<{}>,
  options?: UseComponentParamsOptions<CheckboxGroupProps | ObjectLike, GlobalCheckboxGroupProps>
) {
  const { handleProps, setRef: _setRef } = options || {}
  const elCheckboxGroup = ref<ElCheckboxGroup | null>(null)
  const { createProps, globalProps } = useComponentProps(props,'form', { propNames, globalPropNames: globalCheckboxGroupPropNames, handleProps })
  const setRef = (
    _setRef || ((el: ElCheckboxGroup) => elCheckboxGroup.value = el)
  ) as unknown as string

  const on = context && {
    input(value: string | number | boolean) {
      context.emit('input', value)
    },
    change(value: string | number | boolean) {
      context.emit('change', value)
    }
  }

  const Checkbox = (isNil(props.withButton) ? globalProps?.withButton : props.withButton) ? CheckboxButton : _Checkbox
  const withBorder = (isNil(props.withBorder) ? globalProps?.withBorder : props.withBorder) as boolean

  return {
    render: () => h(CheckboxGroup, {
      ref: setRef,
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