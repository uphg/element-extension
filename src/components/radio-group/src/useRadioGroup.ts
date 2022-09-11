import { h, ref, SetupContext } from "vue"
import { RadioGroup, RadioButton, Radio as _Radio } from "element-ui"
import { ElRadioGroup } from "element-ui/types/radio-group"
import { RadioGroupProps } from "./radioGroupProps"
import { GlobalRadioGroup } from "../../config-provider/src/configProviderProps"
import pick from "../../../utils/pick"
import { withDefaultProps } from "../../../utils/withDefaultProps";
import { useGlobalProps } from "../../../composables/useGlobalProps"

const propNames = ['value', 'disabled', 'border', 'withButton', 'options']
const globalPropNames = ['size', 'textColor', 'fill']

export function useRadioGroup(props: RadioGroupProps, context: SetupContext<{}>) {
  const elRadioGroup = ref<ElRadioGroup | null>(null)
  const globalRadioGroupProps = useGlobalProps<GlobalRadioGroup>('radioGroup')
  const Radio = props.withButton ? RadioButton : _Radio

  const setRef = function(el: ElRadioGroup) {
    elRadioGroup.value = el
  } as unknown as string
  const input = (value: string | number | boolean) => {
    context.emit('input', value)
  }
  const change = (value: string | number | boolean) => {
    context.emit('change', value)
  }

  return {
    render: () => h(RadioGroup, {
      ref: setRef,
      props: {
        ...pick(props, propNames),
        ...withDefaultProps(props as GlobalRadioGroup, globalRadioGroupProps,globalPropNames)
      },
      on: { input, change }
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