import { defineComponent } from 'vue'
import { formProps } from './formProps'
import { useForm } from './useForm'

export default defineComponent({
  name: 'EForm',
  props: formProps,
  setup(props, context) {
    return useForm(props, context)
  }
})