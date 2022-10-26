import { defineComponent } from 'vue'
import { formProps } from './formProps'
import { useForm } from './useForm'

export default defineComponent({
  name: 'EForm',
  props: formProps,
  setup(props, context) {
    const { expose, render } = useForm(props, context)
    context.expose(expose)
    return render
  }
})
