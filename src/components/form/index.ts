import Form from './src/Form'
import { formProps } from './src/formProps'
import { useForm } from './src/useForm'

Form.install = function (Vue) {
  Vue.component(Form.name, Form);
}

export { Form, formProps, useForm }
