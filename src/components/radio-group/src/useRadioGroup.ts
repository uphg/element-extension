import { h, ref, SetupContext } from "vue"
import { RadioGroup, RadioButton, Radio as _Radio } from "element-ui"
import { ElRadioGroup } from "element-ui/types/radio-group"
import { RadioGroupProps } from "./radioGroupProps"
import { GlobalRadioGroup } from "../../config-provider/src/configProviderProps"
import { useComponentProps, UseComponentParamsOptions } from "../../../composables/useComponentProps"

const propNames = ['value', 'disabled', 'border', 'withButton', 'options']
const globalPropNames = ['size', 'textColor', 'fill']

export function useRadioGroup(
  props: RadioGroupProps,
  context: SetupContext<{}>,
  options: UseComponentParamsOptions<RadioGroupProps, GlobalRadioGroup>
) {
  const { handleProps } = options || {}
  const elRadioGroup = ref<ElRadioGroup | null>(null)
  const createProps = useComponentProps(props, 'form', { propNames, globalPropNames, handleProps })
  const setRef = ((el: ElRadioGroup) => elRadioGroup.value = el) as unknown as string

  const input = (value: string | number | boolean) => {
    context.emit('input', value)
  }
  const change = (value: string | number | boolean) => {
    context.emit('change', value)
  }
  const on = { input, change }

  const Radio = props.withButton ? RadioButton : _Radio

  return {
    render: () => h(RadioGroup, {
      ref: setRef,
      props: createProps(),
      on
    }, props.options.map((item) => h(Radio, {
      props: {
        label: item.value,
        name: item.name,
        disabled: item.disabled,
        border: item.border || props.border
      }
    }, [item.label as string])))
  }
}