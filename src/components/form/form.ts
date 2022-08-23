import { defineComponent, h } from 'vue'
import { Form } from 'element-ui'
import { pick } from '../../utils'
import useElForm from '../../composables/useElForm'
import { ElForm } from "element-ui/types/form"
import { elFormProps } from '../../shared/_commonProps'

const formProps = {
  ...elFormProps,
  
  // customize props
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
      props: {
        model: props.model,
        rules: props.rules,
        labelPosition: props.labelPosition,
        labelWidth: props.labelWidth,
        labelSuffix: props.labelSuffix,
        inline: props.inline,
        inlineMessage: props.inlineMessage,
        statusIcon: props.statusIcon,
        showMessage: props.showMessage,
        size: props.size,
        disabled: props.disabled,
        validateOnRuleChange: props.validateOnRuleChange,
        hideRequiredAsterisk: props.hideRequiredAsterisk
      },
      on: {
        validate(value: unknown){
          context.emit('validate', value)
        }
      },
      scopedSlots: {
        default: () => context.slots.default?.()
      }
    })
  }
})