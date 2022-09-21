import { h, SetupContext } from "vue"
import { InputNumber } from 'element-ui'
import { InputNumberProps, GlobalInputNumberProps } from "./inputNumberProps"
import { generateEmits } from "../../../utils/generateEmits"
import { useComponentProps, UseComponentParamsOptions } from "../../../composables/useComponentProps"
import { useElInputNumber } from "../../../composables/useElInputNumber"
import { ObjectLike } from "../../../types/object-like"
import { globalInputNumberPropNames } from "../../../shared/configPropertyMap"

const propNames = ['value', 'name', 'disabled', 'label', 'placeholder']
const emitNames = ['change', 'blur', 'focus']

export function useInputNumber<T extends ObjectLike>(
  props: InputNumberProps | T,
  context: SetupContext<{}>,
  options?: UseComponentParamsOptions<InputNumberProps | ObjectLike, GlobalInputNumberProps>
) {
  const { handleProps } = options || {}
  const { elInputNumber, setRef, focus, select } = useElInputNumber()
  const expose = { focus, select, get elInputNumber() { return elInputNumber.value } }

  const { createProps } = useComponentProps(props, 'inputNumber', { propNames, globalPropNames: globalInputNumberPropNames, handleProps })

  const input = (newVal: number) => {
    if (props.value === newVal) return
    context.emit('input', newVal)
  }
  const otherOn = generateEmits(context.emit, emitNames)
  const on = { input, ...otherOn }

  return {
    expose,
    render: () => h(InputNumber, { ref: setRef, props: createProps(), on })
  }
}