import { h, ref, SetupContext } from "vue";
import { Checkbox as _Checkbox, CheckboxButton, CheckboxGroup } from "element-ui";
import { ElCheckboxGroup } from "element-ui/types/checkbox-group";
import { CheckboxGroupProps } from "./checkboxGroupProps";
import { GlobalCheckboxGroup } from "../../config-provider/src/configProviderProps";
import pick from "../../../utils/pick";
import { useGlobalProps } from "../../../composables/useGlobalProps";
import { withDefaultProps } from "../../../utils/withDefaultProps";

const propNames = ['value', 'disabled']
const globalPropNames = ['min', 'max', 'size', 'fill', 'textColor']

export function useCheckboxGroup(props: CheckboxGroupProps, context: SetupContext<{}>) {
  const elCheckboxGroup = ref<ElCheckboxGroup | null>(null)
  const globalCheckboxGroupProps = useGlobalProps<GlobalCheckboxGroup>('checkboxGroup')
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
      props: {
        ...pick(props, propNames),
        ...withDefaultProps(props, globalCheckboxGroupProps, globalPropNames)
      },
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