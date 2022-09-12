import { h, SetupContext } from "vue"
import { InputNumber } from 'element-ui'
import { InputNumberProps } from "./inputNumberProps"
import { GlobalInputNumber } from "../../config-provider/src/configProviderProps"
import { useGlobalProps } from "../../../composables/useGlobalProps"
import pick from "../../../utils/pick"
import { withDefaultProps } from "../../../utils/withDefaultProps"

const propNames = ['value', 'name', 'disabled', 'label', 'placeholder']
const globalPropNames = ['min', 'max', 'step', 'stepStrictly', 'precision', 'size', 'controls', 'controlsPosition']

export function useInputNumber(props: InputNumberProps, context: SetupContext<{}>) {
  const globalInputNumberProps = useGlobalProps<GlobalInputNumber>('inputNumber')

  return {
    expose: {

    },
    render: () => h(InputNumber, {
      props: {
        ...pick(props, propNames),
        ...withDefaultProps(props, globalInputNumberProps, globalPropNames)
      }
    })
  }
}