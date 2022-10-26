import RadioGroup from './src/RadioGroup'
import { radioGroupProps } from './src/radioGroupProps'
import { useRadioGroup } from './src/useRadioGroup'
import { withInstall } from '../../utils'

const ERadioGroup = withInstall(RadioGroup)

export { RadioGroup, ERadioGroup, radioGroupProps, useRadioGroup }
