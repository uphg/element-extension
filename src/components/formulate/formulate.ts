import { defineComponent, ExtractPropTypes, h, PropType, Ref, ref, VNodeChildren } from "vue"
import { Form, FormItem } from "element-ui"
import { ElForm } from "element-ui/types/form"
import { isArray, isObject } from "../../utils"
import renderInput from './render-input'
import { FormulateFields, FormulateFiled, FormulateBaseFiled, FormulateFullFields, MapRules } from '../../types/formulate'
import { CustomInputValue } from "../../types/custom-input"
import { FormRules, FormData } from '../../types/form'
import useElForm from '../../composables/useElForm'

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
  
  fields: [Array, Object] as PropType<FormulateFields>,
  withEnterNext: Boolean as PropType<boolean>, // 是否开启回车换行
  mapRules: Function as PropType<MapRules>, // 是否添加 map rules 函数，添加后自动开启验证，mapRules({ type, key, label })
  size: String as PropType<string>,
}

const formulateProps = {
  data: [Object] as PropType<FormulateDataProps>,
  ...formulateDataProps,
}

export type FormulateProps = ExtractPropTypes<typeof formulateProps>

function initFormData(baseFields: FormulateFields, fieldsIsArray: boolean) {
  const result: { [key: string]: CustomInputValue } = {}
  resetFormData(result, baseFields, fieldsIsArray)
  return result
}

function resetFormData(formData: { [key: string]: CustomInputValue }, baseFields: FormulateFields, fieldsIsArray: boolean) {
  const fields = (fieldsIsArray ? baseFields : Object.keys(baseFields)) as FormulateFiled[] | string[] 
  fields.forEach((value, _key) => {
    const key = fieldsIsArray ? (value as FormulateFiled).key : value as string
    const type = fieldsIsArray
      ? (value as FormulateFiled).type
      : (baseFields as { [key: string]: FormulateBaseFiled; })[value as string]?.type
    if (!key) return
    switch (type) {
      case 'cascader':
      case 'checkbox':
      case 'file':
      case 'upload':
        formData[key] = []
        break;
      case 'slider':
      case 'number':
      case 'input-number':
        formData[key] = 0
        break;
      case 'switch':
        formData[key] = false
        break;
      default:
        if (/^\$/.test(key)) {
          break
        }
        formData[key] = ''
    }
  })
}

type MapFieldsCallbackParamsItem = FormulateFiled | FormulateBaseFiled | FormulateFiled[] | string | null

function mapFields(
  baseFields: FormulateFields,
  callback: ((item: MapFieldsCallbackParamsItem, index: number) => void) | null,
  fieldsIsArray: boolean
): MapFieldsCallbackParamsItem[] | MapFieldsCallbackParamsItem {
  const fields = (fieldsIsArray ? baseFields : Object.keys(baseFields)) as FormulateFiled[] | string[] 

  return fields.map((value, index) => {
    let item: MapFieldsCallbackParamsItem = null
    if (fieldsIsArray) {
      item = value
    } else {
      if (value === '$footer') {
        const filed = (baseFields as FormulateFullFields)[value] as FormulateFiled[]
        if (isArray(filed)) {
          item = filed
        } else if (filed) {
          item = mapFields(filed, null, false) as MapFieldsCallbackParamsItem 
        }
      } else if (typeof value === 'string') {
        const temp = (baseFields as FormulateFullFields)[value]
        item = /^\$/.test(value)
          ? { ...temp, type: value.replace('$', '') }
          : { ...temp, key: value }
      }
    }
    
    callback && callback(item, index)
    return item
  })
}

function renderFormItem(item: FormulateFiled, index: number, children?: VNodeChildren) {
  return h(FormItem, {
    key: `s.form.item.${index}`,
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
  }, 
    [item.itemPrefix, ...(children as Array<VNodeChildren>), item.itemSuffix]
  )
}

export default defineComponent({
  name: 'EFormulate',
  props: formulateProps,
  setup(_props, context) {
    const props = _props.data ? _props.data : _props
    const fieldsIsArray = isArray(props.fields)
    const rules = ref<FormRules | { [key: string]: [] }>({})

    if (!props.fields) {
      throw new Error('[ElementPart] "fields" attribute is required');
    }

    const formData = ref(initFormData(props.fields, fieldsIsArray))
    const fields = mapFields(props.fields, (item) => {
      const { type, key, label, rules: _rules } = item as FormulateFiled
      if (_rules && isObject(_rules)) {
        rules.value[key] = isArray(_rules) ?  _rules : [_rules]
      } else if (props.rules && props.rules?.[key]) {
        rules.value[key] = props.rules?.[key]
      } else if (props.mapRules) {
        if (typeof props.mapRules !== 'function') {
          throw new Error('[ElementPart] "mapRules" must be a function and return an array')
        }
        const rule = props.mapRules({ type, key, label })
        rule && rule.length && (rules.value[key] = rule) 
      }
    }, fieldsIsArray)

    const { elForm, validate, validateField, clearValidate } = useElForm()

    function resetFields() {
      resetFormData(formData.value, props.fields!, fieldsIsArray)
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
      elForm.value?.validate((valid: boolean, errors: object) => {
        callback(formData.value, { valid, errors })
      })
    }

    context.expose({
      validate,
      validateField,
      resetFields,
      clearValidate,
      setValues,
      getValues,
      submit,
      get formData() {
        return formData.value
      },
      get elForm() {
        return elForm.value
      }
    })

    return () => h(Form, {
        // @ts-ignore
        ref: (el) => elForm.value = el,
        props: {
          rules: rules.value,
          model: formData.value,
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
        }
      },
      (fields as FormulateFiled[])?.map((item, index) => item.vIf && !item.vIf(formData.value)
        ? null
        : renderFormItem(item, index, 
          (isArray(item)
            ? item.map((piece, i) => renderInput(piece, { elForm, formData, context }))
            : [renderInput(item, { elForm, formData, context })]
          )
        )
      )
    )
  }
})
