import { h, ref, SetupContext } from "vue"
import { InputNumber } from 'element-ui'
import { InputNumberProps } from "./inputNumberProps"
import { GlobalInputNumber } from "../../config-provider/src/configProviderProps"
import { useGlobalProps } from "../../../composables/useGlobalProps"
import pick from "../../../utils/pick"
import { withDefaultProps } from "../../../utils/withDefaultProps"
import { generateEmits } from "../../../utils/generateEmits"
import { ElInputNumber } from "../../../types/element-components"

const propNames = ['value', 'name', 'disabled', 'label', 'placeholder']
const globalPropNames = ['min', 'max', 'step', 'stepStrictly', 'precision', 'size', 'controls', 'controlsPosition']
const emitNames = ['change', 'blur', 'focus']

export function useInputNumber(props: InputNumberProps, context: SetupContext<{}>) {
  const elInputNumber = ref<ElInputNumber | null>(null)
  const globalInputNumberProps = useGlobalProps<GlobalInputNumber>('inputNumber')
  const otherOn = generateEmits(context.emit, emitNames)
  const input = (newVal: number) => {
    if (props.value === newVal) return
    context.emit('input', newVal)
  }
  const on = { input, ...otherOn }
  const setRef = function(el: ElInputNumber) {
    elInputNumber.value = el
  } as unknown as string

  return {
    expose: {
      focus() {
        elInputNumber.value?.focus()
      },
      select() {
        elInputNumber.value?.select()
      },
      get elInputNumber() {
        return elInputNumber.value
      }
    },
    render: () => h(InputNumber, {
      ref: setRef,
      props: {
        ...pick(props, propNames),
        ...withDefaultProps(props, globalInputNumberProps, globalPropNames)
      },
      on
    })
  }
}