import Form from './src/Form'
import { formProps } from './src/formProps'
import { useForm } from './src/useForm'
import { withInstall } from '../../utils'

const EForm = withInstall(Form)

export { Form, EForm, formProps, useForm }
