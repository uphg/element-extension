import Button from './src/Button'
import { buttonProps } from './src/buttonProps'
import { useButton } from './src/useButton'

Button.install = function (Vue) {
  Vue.component(Button.name, Button);
}

export { Button, buttonProps, useButton }
