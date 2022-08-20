import { defineComponent, h } from 'vue'
import { Form } from 'element-ui'
import { pick } from '../../utils'
import useElForm from '../../composables/useElForm'
import { ElForm } from "element-ui/types/form"
import { elFormProps } from '../../shared/elFormProps'

const propNames = ['model', 'rules', 'labelPosition', 'labelWidth', 'labelSuffix', 'inline', 'inlineMessage', 'statusIcon', 'showMessage', 'size', 'disabled', 'validateOnRuleChange', 'hideRequiredAsterisk']

const formProps = {
  ...elFormProps,
  
  // customize props
  // withValidate: Boolean as PropType<boolean>, // 是否开启验证
  // withEnterNext: Boolean as PropType<boolean>, // 是否开启回车换行
}

export default defineComponent({
  name: 'EForm',
  props: formProps,
  setup(props, context) {
    const { elForm, validate, validateField, clearValidate } = useElForm()

    context.expose({
      validate,
      validateField,
      clearValidate,
      get elForm() {
        return elForm.value
      }
    })
    // @ts-ignore
    return () => h(Form, {
      ref: (el: ElForm) => { elForm.value = el },
      props: pick(props, propNames),
      scopedSlots: {
        default: () => context.slots.default?.()
      }
    })
  }
})