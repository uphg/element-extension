import Form from './src/Form'
import { formProps } from './src/formProps'
import { useForm } from './src/useForm'
import { ComponentPlugin } from '../../types/component-plugin';

(Form as ComponentPlugin<typeof Form>).install = function (Vue) {
  Vue.component(Form.name, Form);
}

export { Form, formProps, useForm }
