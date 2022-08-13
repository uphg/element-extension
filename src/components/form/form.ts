import { defineComponent, h, PropType, Ref, ref } from 'vue'
import { Form } from 'element-ui'
import { ElForm, ValidateCallback, ValidateFieldCallback } from 'element-ui/types/form'
import { pick } from '../../utils'

const propNames = ['model', 'rules', 'labelPosition', 'labelWidth', 'labelSuffix', 'inline', 'inlineMessage', 'statusIcon', 'showMessage', 'size', 'disabled', 'validateOnRuleChange', 'hideRequiredAsterisk']

const formProps = {
  model: Object as PropType<object>,
  rules: {
    type: [Object, Array] as PropType<object|Array<unknown>>,
    default: () => ({})
  },
  labelPosition: String as PropType<string>,
  labelWidth: String as PropType<string>,
  labelSuffix: {
    type: String as PropType<string>,
    default: ''
  },
  
  inline: Boolean as PropType<boolean>,
  inlineMessage: Boolean as PropType<boolean>,
  statusIcon: Boolean as PropType<boolean>,
  showMessage: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  size: String as PropType<string>,
  disabled: Boolean as PropType<boolean>,
  validateOnRuleChange: {
    type: Boolean as PropType<boolean>,
    default: true // el 默认 true
  },
  hideRequiredAsterisk: {
    type: Boolean as PropType<boolean>,
    default: false
  }

  // customize props
  // withValidate: Boolean as PropType<boolean>, // 是否开启验证
  // withEnterNext: Boolean as PropType<boolean>, // 是否开启回车换行
}

export default defineComponent({
  name: 'SForm',
  props: formProps,
  setup(props, context) {
    const elFormRef = ref<ElForm | null>(null)

    function validate(callback: ValidateCallback) {
      elFormRef.value?.validate(callback)
    }

    function validateField(props: string | string[], callback?: ValidateFieldCallback) {
      elFormRef.value?.validateField(props, callback)
    }

    // function resetFields() {
    //   elFormRef.value?.resetFields()
    // }

    function clearValidate(props?: string | string[]) {
      elFormRef.value?.clearValidate(props)
    }

    context.expose({
      validate,
      validateField,
      clearValidate,
      get elFormRef() {
        return elFormRef.value
      }
    })
    // @ts-ignore
    return () => h(Form, {
      ref: (el: ElForm) => { elFormRef.value = el },
      props: pick(props, propNames),
      scopedSlots: {
        default: () => context.slots.default?.()
      }
    })
  }
})