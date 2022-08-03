import { defineComponent, h, PropType, ref } from 'vue'
import { Form } from 'element-ui'

const formProps = {
  model: {
    type: Object as PropType<object>,
    default: () => ({})
  },
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
  validateOnRuleChange: {
    type: Boolean as PropType<boolean>,
    default: true
  }, // 是否在 rules 属性改变后立即触发一次验证，Element 默认 true

  // customize props
  withValidate: Boolean as PropType<boolean>, // 是否开启验证
  withEnterNext: Boolean as PropType<boolean>, // 是否开启回车换行
}

export default defineComponent({
  name: 'SForm',
  props: formProps,
  setup(props, context) {

    context.expose({
      validate() { }
    })

    return () => h(Form, {
      props: {
        model: props.model,
        rules: props.rules,
        labelPosition: props.labelPosition,
        labelWidth: props.labelWidth,
        labelSuffix: props.labelSuffix,
        validateOnRuleChange: props.validateOnRuleChange,
      },
      scopedSlots: {
        default: () => context.slots.default?.()
      }
    })
  }
})