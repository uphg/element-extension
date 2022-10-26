import Switch from './src/Switch'
import { switchProps } from './src/switchProps'
import { useSwitch } from './src/useSwitch'
import { withInstall } from '../../utils'

const ESwitch = withInstall(Switch)

export { Switch, ESwitch, switchProps, useSwitch }
