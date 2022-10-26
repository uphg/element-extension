import Input from './src/Input'
import { inputProps } from './src/inputProps'
import { useInput } from './src/useInput'
import { withInstall } from '../../utils'

const EInput = withInstall(Input)

export { Input, EInput, inputProps, useInput }
