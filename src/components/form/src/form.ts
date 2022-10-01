import { defineComponent } from 'vue'
import { formProps } from './formProps'
import { useForm } from './useForm'
import { ElementPartComponent } from '../../../../types/component'

const EForm = defineComponent({
  name: 'EForm',
  props: formProps,
  setup(props, context) {
    const { expose, render } = useForm(props, context)
    context.expose(expose)
    return render
  }
})

export default EForm as ElementPartComponent<typeof EForm>