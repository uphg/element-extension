import InputNumber from './src/InputNumber'
import { inputNumberProps } from './src/inputNumberProps'
import { useInputNumber } from './src/useInputNumber'
import { withInstall } from '../../utils'

const EInputNumber = withInstall(InputNumber)

export { InputNumber, EInputNumber, inputNumberProps, useInputNumber }
