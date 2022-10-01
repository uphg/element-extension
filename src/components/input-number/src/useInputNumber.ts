import { h, SetupContext } from "vue"
import { InputNumber } from 'element-ui'
import { InputNumberProps, GlobalInputNumberProps } from "./inputNumberProps"
import { ElInputNumber } from "../../../../types/_element-ui"
import { generateEmits } from "../../../utils/generateEmits"
import { useComponentProps, UseComponentParamsOptions } from "../../../composables/useComponentProps"
import { useElInputNumber } from "../../../composables/useElInputNumber"
import { ObjectLike } from "../../../../types/_common"
import { globalInputNumberPropNames } from "../../../shared/configPropertyMap"

const _propNames = ['name', 'disabled', 'label', 'placeholder']
const emitNames = ['change', 'blur', 'focus']

export function useInputNumber<T extends ObjectLike>(
  props: InputNumberProps | T,
  context?: SetupContext<{}>,
  options?: UseComponentParamsOptions<InputNumberProps | ObjectLike, GlobalInputNumberProps>
) {
  const { handleProps, handleRef: _handleRef } = options || {}
  const { elInputNumber, focus, select } = useElInputNumber()
  const handleRef = (_handleRef || ((el: ElInputNumber) => { elInputNumber.value = el })) as unknown as string

  const expose = { focus, select, get elInputNumber() { return elInputNumber.value } }
  const propNames = options?.status === 1 ? _propNames : ['value', ..._propNames]
  const { createProps } = useComponentProps(props, 'inputNumber', { propNames, globalPropNames: globalInputNumberPropNames, handleProps })

  const on = context ? {
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