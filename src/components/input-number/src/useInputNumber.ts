import { h, SetupContext } from "vue"
import { InputNumber } from 'element-ui'
import { InputNumberProps, globalInputNumberProps, GlobalInputNumberProps, inputNumberBaseProps } from "./inputNumberProps"
import { ElInputNumber } from "../../../../types/_element-ui"
import { createNames, generateEmits, keys } from "../../../utils"
import { useComponentProps, UseComponentParamsOptions } from "../../../composables/useComponentProps"
import { useElInputNumber } from "../../../composables/useElInputNumber"
import { ObjectLike } from "../../../../types/_common"

const emitNames = ['change', 'blur', 'focus']

export function useInputNumber<T extends ObjectLike>(
  props: InputNumberProps | T,
  context?: SetupContext<{}>,
  options?: UseComponentParamsOptions<InputNumberProps | ObjectLike, GlobalInputNumberProps>
) {
  const { handleProps, handleRef: _handleRef } = options || {}
  const { elInputNumber, focus, select } = useElInputNumber()
  const handleRef = (_handleRef || ((el: ElInputNumber) => { elInputNumber.value = el })) as unknown as string
  const globalPropNames = keys(globalInputNumberProps)

  const expose = { focus, select, get elInputNumber() { return elInputNumber.value } }
  const propNames = createNames(inputNumberBaseProps, options?.status)
  const { createProps } = useComponentProps(props, 'inputNumber', { propNames, globalPropNames, handleProps })

  const on = context?.emit ? {
    input: (newVal: number) => {
      if (props.value === newVal) return
      context.emit('input', newVal)
    },
    ...generateEmits(context.emit, emitNames)
  } : options?.on

  return {
    expose,
    render: () => h(InputNumber, { ref: handleRef, props: createProps(), on })
  }
}