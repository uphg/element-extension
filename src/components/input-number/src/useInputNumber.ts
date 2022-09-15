import { h, ref, SetupContext } from "vue"
import { InputNumber } from 'element-ui'
import { InputNumberProps } from "./inputNumberProps"
import { GlobalInputNumber } from "../../config-provider/src/configProviderProps"
import { generateEmits } from "../../../utils/generateEmits"
import { ElInputNumber } from "../../../types/element-components"
import { useComponentProps, UseComponentParamsOptions } from "../../../composables/useComponentProps"
import { useElInputNumber } from "../../../composables/useElInputNumber"

const propNames = ['value', 'name', 'disabled', 'label', 'placeholder']
const globalPropNames = ['min', 'max', 'step', 'stepStrictly', 'precision', 'size', 'controls', 'controlsPosition']
const emitNames = ['change', 'blur', 'focus']

export function useInputNumber(
  props: InputNumberProps,
  context: SetupContext<{}>,
  options?: UseComponentParamsOptions<InputNumberProps, GlobalInputNumber>
) {
  const { handleProps } = options || {}
  const { elInputNumber, focus, select } = useElInputNumber()
  const expose = { focus, select, get elInputNumber() { return elInputNumber.value } }

  const createProps = useComponentProps(props, 'inputNumber', { propNames, globalPropNames, handleProps })

  const otherOn = generateEmits(context.emit, emitNames)
  const input = (newVal: number) => {
    if (props.value === newVal) return
    context.emit('input', newVal)
  }
  const on = { input, ...otherOn }

  const setRef = ((el: ElInputNumber) => { elInputNumber.value = el }) as unknown as string

  return {
    expose,
    render: () => h(InputNumber, { ref: setRef, props: createProps(), on })
  }
}