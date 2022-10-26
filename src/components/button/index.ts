import Button from './src/Button'
import { buttonProps } from './src/buttonProps'
import { useButton } from './src/useButton'
import { withInstall } from '../../utils'

const EButton = withInstall(Button)

export { Button, EButton, buttonProps, useButton }
