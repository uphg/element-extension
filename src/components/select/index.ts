import Select from './src/Select'
import { selectProps } from './src/selectProps'
import { useSelect } from './src/useSelect'
import { withInstall } from '../../utils'

const ESelect = withInstall(Select)

export { Select, ESelect, selectProps, useSelect }
