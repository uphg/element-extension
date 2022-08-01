import { h, ref } from "vue"
import { Form as ElForm, FormItem as ElFormItem, Input as ElInput } from "element-ui"
import { isArray } from "../../utils"
import renderInput from './render-input'

type inputTypes = 'text' | 'password' | 'textarea' | ''

type BaseFileds = {
  [key: string]: {
    type?: inputTypes
  }
}

type ArrayFileds = []

type Fileds = BaseFileds | ArrayFileds

function initFormData(baseFileds, filedsIsArray) {
  const result = {}
  const fileds = filedsIsArray ? baseFileds : Object.keys(baseFileds)
  fileds.forEach((value, _key) => {
    const key = filedsIsArray ? value.key : value
    const type = filedsIsArray ? value.type : baseFileds[value]?.type
    if (!key) return
    switch (type) {
      case 'checkbox':
      case 'file':
      case 'upload':
        result[key] = []
        break;
      case 'switch':
        result[key] = false
        break;
      default:
        if (/^\$/.test(key)) {
          break
        }
        result[key] = ''
    }
  })
  return result
}

function mapFileds(baseFileds, callback, filedsIsArray) {
  const fileds = filedsIsArray ? baseFileds : Object.keys(baseFileds)

  return fileds.map((value, index) => {
    let item
    if (filedsIsArray) {
      item = value
    } else {
      if (value === '$footer') {
        const filed = baseFileds[value]
        if (isArray(filed)) {
          item = filed
        } else {
          item = mapFileds(filed, null, false)
        }
      } else if (/^\$/.test(value)) {
        item = { ...baseFileds[value], type: value.replace('$', '') }
      } else {
        item = { ...baseFileds[value], key: value }
      }
    }
    callback && callback(item, index)
    return item
  })
}

export default {
  name: 'SFormulate',
  props: {
    data: [Object],
    fileds: [Array, Object],
    labelPosition: String,
    labelWidth: String,
    labelSuffix: {
      type: String,
      default: ''
    },
    validateOnRuleChange: false, // 是否在 rules 属性改变后立即触发一次验证，El 默认 true
    withValidate: Boolean, // 是否开启验证
    withEnterNext: Boolean, // 是否开启回车换行
    errorFormat: Function, // 错误提示格式，errorFormat({ type, key, label })
    size: String,
  },
  setup(_props, context) {
    const props = _props.data ? _props.data : _props
    const filedsIsArray = isArray(props.fileds)

    const formRef = ref(null)
    const rules = ref({})

    const formData = ref(initFormData(props.fileds, filedsIsArray))
    const fileds = mapFileds(props.fileds, (item) => {
      const { type, key, label, rules: _rules } = item
      if (_rules) {
        rules.value[key] = _rules
      } else if (props.withValidate && props.errorFormat) {
        rules.value[key] = props.errorFormat({ type, key, label })
      }
    }, filedsIsArray)

    function validate(callback) {
      formRef.value.validate(callback)
    }

    function validateField(props, callback) {
      formRef.value.clearValidate(props, callback)
    }

    function resetFields() {
      formRef.value.clearValidate()
    }

    function clearValidate(props) {
      formRef.value.clearValidate(props)
    }

    function setFormData(obj) {
      const keys = Object.keys(obj)
      keys.forEach((key) => {
        formData.value[key] = obj[key]
      })
    }

    function getFormData() {
      return formData.value
    }

    function submit(callback) {
      formRef.value.validate((valid, errors) => {
        callback(formData.value, { valid, errors })
      })
    }

    context.expose({
      validate,
      validateField,
      resetFields,
      clearValidate,
      get formData() {
        return formData.value
      },
      set formData(obj) {
        setFormData(obj)
      },
      setFormData,
      getFormData,
      submit,
    })

    return () => h(ElForm, {
      ref: (el) => formRef.value = el,
      props: {
        rules: rules.value,
        model: formData.value,
        labelPosition: props.labelPosition,
        labelWidth: props.labelWidth,
        labelSuffix: props.labelSuffix,
        validateOnRuleChange: props.validateOnRuleChange,
      }
    }, fileds.map((item) => h(ElFormItem, {
      props: {
        label: item.label,
        prop: item.key,
        required: item.required
      }
    }, isArray(item)
      ? item.map(piece => renderInput(piece, { formRef, formData, context }))
      : [renderInput(item, { formRef, formData, context })]))
    )
  }
}
