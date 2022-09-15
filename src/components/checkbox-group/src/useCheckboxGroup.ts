import { h, ref, SetupContext } from "vue";
import { Checkbox as _Checkbox, CheckboxButton, CheckboxGroup } from "element-ui";
import { ElCheckboxGroup } from "element-ui/types/checkbox-group";
import { CheckboxGroupProps } from "./checkboxGroupProps";
import { GlobalCheckboxGroup } from "../../config-provider/src/configProviderProps";
import { useComponentProps, UseComponentParamsOptions } from "../../../composables/useComponentProps";

const propNames = ['value', 'disabled']
const globalPropNames = ['min', 'max', 'size', 'fill', 'textColor']

export function useCheckboxGroup(
  props: CheckboxGroupProps,
  context: SetupContext<{}>,
  options: UseComponentParamsOptions<CheckboxGroupProps, GlobalCheckboxGroup>
) {
  const { handleProps } = options || {}
  const elCheckboxGroup = ref<ElCheckboxGroup | null>(null)
  const createProps = useComponentProps(props, 'form', { propNames, globalPropNames, handleProps })
  const Checkbox = props.withButton ? CheckboxButton : _Checkbox

  const setRef = function(el: ElCheckboxGroup) {
    elCheckboxGroup.value = el
  } as unknown as string
  const input = (value: string | number | boolean) => {
    context.emit('input', value)
  }
  const change = (value: string | number | boolean) => {
    context.emit('change', value)
  }

  return {
    render: () => h(CheckboxGroup, {
      ref: setRef,
      props: createProps(),
      on: { input, change }
    }, props.options.map((item) => h(Checkbox, {
      props: {
        label: item.value,
        name: item.name,
        disabled: item.disabled,
        border: item.border || props.border
      }
    }, [item.label as string])))
  }
}