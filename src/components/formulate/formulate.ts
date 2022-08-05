import { defineComponent, ExtractPropTypes, h, PropType, ref } from "vue"
import { Form, FormItem } from "element-ui"
import { ValidateCallback, ValidateFieldCallback } from "element-ui/types/form"
import { isArray } from "../../utils"
import renderInput from './render-input'
import { FormulateFileds, FormulateFiled, FormulateBaseFiled, FormulateFullFileds, ErrorFormat } from '../../types/formulate'
import { InputValue } from "../../types/input"
import { FormRules, FormData } from '../../types/form'

type FormulateDataProps = ExtractPropTypes<typeof formulateDataProps>

const formulateDataProps = {
  fileds: [Array, Object] as PropType<FormulateFileds>,
  labelPosition: String as PropType<string>,
  labelWidth: String as PropType<string>,
  labelSuffix: {
    type: String as PropType<string>,
    default: ''
  },
  validateOnRuleChange: Boolean as PropType<boolean>, // 是否在 rules 属性改变后立即触发一次验证，El 默认 true
  withValidate: Boolean as PropType<boolean>, // 是否开启验证
  withEnterNext: Boolean as PropType<boolean>, // 是否开启回车换行
  errorFormat: Function as PropType<ErrorFormat>, // 错误提示格式，errorFormat({ type, key, label })
  size: String as PropType<string>,
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
    const rules = ref<FormRules | { [key: string]: [] }>({})

    if (!props.fileds) {
      throw new Error('[SimElement] "fileds" attribute is required');
    }

    const formData = ref(initFormData(props.fileds, filedsIsArray))
    const fileds = mapFileds(props.fileds, (item) => {
      const { type, key, label, rules: _rules } = item as FormulateFiled
      if (_rules) {
        rules.value[key] = _rules
      } else if (props.withValidate && props.errorFormat) {
        rules.value[key] = props.errorFormat({ type, key, label })
      }
    }, filedsIsArray)

    function validate(callback: ValidateCallback) {
      formRef.value.validate(callback)
    }

    function validateField(props: string | string[], callback?: ValidateFieldCallback) {
      formRef.value.validateField(props, callback)
    }

    function resetFields() {
      formRef.value.resetFields()
    }

    function clearValidate(props?: string | string[]) {
      formRef.value.clearValidate(props)
    }

    function setValues(obj: FormData) {
      const keys = Object.keys(obj)
      keys.forEach((key) => {
        formData.value[key] = obj[key]
      })
    }

    function getValues() {
      return formData.value
    }
    
    function submit(callback: (formData: FormData, options: { valid: boolean, errors: object }) => void) {
      formRef.value.validate((valid: boolean, errors: object) => {
        callback(formData.value, { valid, errors })
      })
    }

    context.expose({
      get formData() {
        return formData.value
      },
      validate,
      validateField,
      resetFields,
      clearValidate,
      setValues,
      getValues,
      submit,
    })

    return () =>  {
      
      return h(Form, {
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
      }, (fileds as FormulateFiled[])?.map((item) => item.vIf && !item.vIf(formData.value)
          ? null
          : h(FormItem, {
            props: {
              label: item.label,
              prop: item.key,
              required: item.required
            }
          }, isArray(item)
            ? item.map(piece => renderInput(piece, { formRef, formData, context }))
            : [renderInput(item, { formRef, formData, context })]
          )
        )
      )
    }
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

type MapFiledsCallbackParamsItem = FormulateFiled | FormulateBaseFiled | FormulateFiled[] | string | null

function mapFileds(
  baseFileds: FormulateFileds,
  callback: ((item: MapFiledsCallbackParamsItem, index: number) => void) | null,
  filedsIsArray: boolean
): MapFiledsCallbackParamsItem[] | MapFiledsCallbackParamsItem {
  const fileds = (filedsIsArray ? baseFileds : Object.keys(baseFileds)) as FormulateFiled[] | string[] 

  return fileds.map((value, index) => {
    let item: MapFiledsCallbackParamsItem = null
    if (filedsIsArray) {
      item = value
    } else {
      if (value === '$footer') {
        const filed = (baseFileds as FormulateFullFileds)[value] as FormulateFiled[]
        if (isArray(filed)) {
          item = filed
        } else if (filed) {
          item = mapFileds(filed, null, false) as MapFiledsCallbackParamsItem 
        }
      } else if (typeof value === 'string') {
        const temp = (baseFileds as FormulateFullFileds)[value]
        item = /^\$/.test(value)
          ? { ...temp, type: value.replace('$', '') }
          : { ...temp, key: value }
      }
    }
    
    callback && callback(item, index)
    return item
  })
}