import { h, ref, SetupContext } from "vue";
import { Checkbox as _Checkbox, CheckboxButton, CheckboxGroup } from "element-ui";
import { ElCheckboxGroup } from "element-ui/types/checkbox-group";
import { CheckboxGroupOption, CheckboxGroupProps, GlobalCheckboxGroupProps } from "./checkboxGroupProps";
import { useComponentProps, UseComponentParamsOptions } from "../../../composables/useComponentProps";
import { ObjectLike } from "../../../types/object-like";
import { globalCheckboxGroupPropNames } from "../../../shared/configPropertyMap";

const propNames = ['value', 'disabled']

export function useCheckboxGroup<T extends ObjectLike>(
  props: CheckboxGroupProps | T,
  context?: SetupContext<{}>,
  options?: UseComponentParamsOptions<CheckboxGroupProps | ObjectLike, GlobalCheckboxGroupProps>
) {
  const { handleProps } = options || {}
  const elCheckboxGroup = ref<ElCheckboxGroup | null>(null)
  const { createProps, globalProps } = useComponentProps(props,'form', { propNames, globalPropNames: globalCheckboxGroupPropNames, handleProps })
  const setRef = ((el: ElCheckboxGroup) => elCheckboxGroup.value = el) as unknown as string

  const on = context && {
    input(value: string | number | boolean) {
      context.emit('input', value)
    },
    change(value: string | number | boolean) {
      context.emit('change', value)
    }
  }

  const Checkbox = (props.withButton || globalProps?.withButton) ? CheckboxButton : _Checkbox
  const withBorder = (props.withBorder || globalProps?.withBorder)

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