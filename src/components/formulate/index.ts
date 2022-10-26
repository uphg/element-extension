import Formulate from './src/Formulate'
import { formulateProps } from './src/formulateProps'
import { useFormulate } from './src/useFormulate'
import { withInstall } from '../../utils'

const EFormulate = withInstall(Formulate)

export { Formulate, EFormulate, formulateProps, useFormulate }
