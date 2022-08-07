import { defineComponent, ExtractPropTypes, h, PropType, ref } from "vue"
import { Form, FormItem } from "element-ui"
import { ValidateCallback, ValidateFieldCallback } from "element-ui/types/form"
import { isArray } from "../../utils"
import renderInput from './render-input'
import { FormulateFileds, FormulateFiled, FormulateBaseFiled, FormulateFullFileds, MapRules } from '../../types/formulate'
import { InputValue } from "../../types/input"
import { FormRules, FormData } from '../../types/form'

type FormulateDataProps = ExtractPropTypes<typeof formulateDataProps>

const formulateDataProps = {
  rules: Object as PropType<FormRules>,
  inline: Boolean as PropType<boolean>,
  inlineMessage: Boolean as PropType<boolean>,
  showMessage: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  statusIcon: Boolean,
  disabled: Boolean as PropType<boolean>,
  labelPosition: String as PropType<string>,
  labelWidth: String as PropType<string>,
  labelSuffix: {
    type: String as PropType<string>,
    default: ''
  },
  validateOnRuleChange: Boolean as PropType<boolean>, // 是否在 rules 属性改变后立即触发一次验证，El 默认 true
  hideRequiredAsterisk: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  
  fileds: [Array, Object] as PropType<FormulateFileds>,
  withEnterNext: Boolean as PropType<boolean>, // 是否开启回车换行
  mapRules: Function as PropType<MapRules>, // 是否添加 map rules 函数，添加后自动开启验证，mapRules({ type, key, label })
  size: String as PropType<string>,
}

const formulateProps = {
  data: [Object] as PropType<FormulateDataProps>,
  ...formulateDataProps,
}

type FormulateProps = ExtractPropTypes<typeof formulateProps>

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
      } else if (props.rules && props.rules?.[key]) {
        rules.value[key] = props.rules?.[key]
      } else if (props.mapRules) {
        if (typeof props.mapRules !== 'function') {
          throw new Error('[SimElement] "mapRules" must be a function and return an array')
        }
        const rule = props.mapRules({ type, key, label })
        rule && rule.length && (rules.value[key] = rule) 
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
    }, (fileds as FormulateFiled[])?.map((item, index) => item.vIf && !item.vIf(formData.value)
        ? null
        : h(FormItem, {
          key: `SForm.item.${index}`,
          props: {
            label: item.label,
            labelWidth: item.labelWidth,
            prop: item.prop || item.key,
            required: item.required,
            rules: item.rules,
            error: item.error,
            validateStatus: item.validateStatus,
            for: item.for,
            inlineMessage: item.inlineMessage,
            showMessage: item.showMessage,
            size: item.size
          }
        }, isArray(item)
          ? item.map(piece => renderInput(piece, { formRef, formData, context }))
          : [renderInput(item, { formRef, formData, context })]
        )
      )
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
      case 'cascader':
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