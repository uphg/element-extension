import Switch from './src/Switch'
import { switchProps } from './src/switchProps'
import { useSwitch } from './src/useSwitch'
import { ComponentPlugin } from '../../types/component-plugin'

(Switch as ComponentPlugin<typeof Switch>).install = function (Vue) {
  Vue.component(Switch.name, Switch);
}

export { Switch, switchProps, useSwitch }
