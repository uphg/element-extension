import Form from './src/form'
import { formProps } from './src/formProps'
import { useForm } from './src/useForm'

// @ts-ignore
Form.install = function (Vue) {
  Vue.component(Form.name, Form);
}

export { Form, formProps, useForm }
