import CheckboxGroup from './src/CheckboxGroup'
import { checkboxGroupProps } from './src/checkboxGroupProps'
import { useCheckboxGroup } from './src/useCheckboxGroup'
import { withInstall } from '../../utils'

const ECheckboxGroup = withInstall(CheckboxGroup)

export { CheckboxGroup, ECheckboxGroup, checkboxGroupProps, useCheckboxGroup }
