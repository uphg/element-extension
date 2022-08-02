import { defineComponent, ExtractPropTypes, h, PropType, ref } from "vue"
import { Form, FormItem, Input } from "element-ui"
import { isArray } from "../../utils"
import renderInput from './render-input'
import { FormulateFileds, FormulateFiled, FormulateBaseFiled } from '../../types/formulate'
import { InputValue } from "../../types/input"
import { FormRules } from '../../types/form'

type FormulateDataProps = ExtractPropTypes<typeof formulateDataProps>

const formulateDataProps = {
  fileds: [Array, Object] as PropType<FormulateFileds>,
  labelPosition: String,
  labelWidth: String,
  labelSuffix: {
    type: String,
    default: ''
  },
  validateOnRuleChange: Boolean, // 是否在 rules 属性改变后立即触发一次验证，El 默认 true
  withValidate: Boolean, // 是否开启验证
  withEnterNext: Boolean, // 是否开启回车换行
  errorFormat: Function, // 错误提示格式，errorFormat({ type, key, label })
  size: String,
}

const formulateProps = {
  data: [Object] as PropType<FormulateDataProps>,
  ...formulateDataProps,
}

export default defineComponent({
  name: 'SFormulate',
  props: formulateProps,
  setup(_props, context) {
    const props = _props.data ? _props.data : _props
    const filedsIsArray = isArray(props.fileds)

    const formRef = ref<any>(null)
    const rules = ref<FormRules>({})

    if (!props.fileds) {
      throw new Error('[SimElement] "fileds" attribute is required');
    }

    const formData = ref(initFormData(props.fileds, filedsIsArray))
    const fileds: FormulateFiled[] = mapFileds(props.fileds, (item) => {
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

    return () => h(Form, {
      // @ts-ignore
      ref: (el) => formRef.value = el,
      props: {
        rules: rules.value,
        model: formData.value,
        labelPosition: props.labelPosition,
        labelWidth: props.labelWidth,
        labelSuffix: props.labelSuffix,
        validateOnRuleChange: props.validateOnRuleChange,
      }
    }, fileds.map((item) => h(FormItem, {
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
})

function initFormData(baseFileds: FormulateFileds, filedsIsArray: boolean) {
  const result: { [key: string]: InputValue } = {}
  const fileds = (filedsIsArray ? baseFileds : Object.keys(baseFileds)) as FormulateFiled[] | string[] 
  fileds.forEach((value, _key) => {
    const key = filedsIsArray ? (value as FormulateFiled).key : value as string
    const type = filedsIsArray
      ? (value as FormulateFiled).type
      : (baseFileds as { [key: string]: FormulateBaseFiled; })[value as string]?.type
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

function mapFileds(
  baseFileds: FormulateFileds,
  callback: ((item: string, index: number) => void) | null,
  filedsIsArray: boolean
): FormulateFiled[] {
  const fileds = (filedsIsArray ? baseFileds : Object.keys(baseFileds)) as FormulateFiled[] | string[] 

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
      } else if (typeof value === 'string') {
        const temp = baseFileds[value]
        item = /^\$/.test(value)
          ? { ...temp, type: value.replace('$', '') }
          // @ts-ignore
          : { ...temp, key: value }
      }
    }
    callback && callback(item, index)
    return item
  })
}