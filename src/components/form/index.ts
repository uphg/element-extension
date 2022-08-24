import Form from './src/form'

// @ts-ignore
Form.install = function (Vue) {
  Vue.component(Form.name, Form);
}

export default Form
