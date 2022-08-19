import { defineComponent, ExtractPropTypes, h, PropType, Ref, ref, VNodeChildren } from "vue"
import { Form, FormItem } from "element-ui"
import { isArray, isObject } from "../../utils"
import renderInput from './renderInput'
import { FormulateFields, FormulateField, MapRules } from '../../types/formulate'
import { CustomInputValue } from "../../types/customInput"
import { FormRules, FormData } from '../../types/form'
import useElForm from '../../composables/useElForm'
import { elFormProps } from '../../shared/elFormProps'
import { VNodeChildrenArrayContents } from "vue/types/umd"

type FormulateDataProps = ExtractPropTypes<typeof formulateDataProps>

const formulateDataProps = {
  ...elFormProps,
  
  fields: [Array, Object] as PropType<FormulateFields>,
  withEnterNext: Boolean as PropType<boolean>, // 是否开启回车换行
  mapRules: Function as PropType<MapRules>, // 是否添加 map rules 函数，添加后自动开启验证，mapRules({ type, key, label })
}

const formulateProps = {
  data: [Object] as PropType<FormulateDataProps>,
  ...formulateDataProps,
}

export type FormulateProps = ExtractPropTypes<typeof formulateProps>

function initFormData(baseFields: FormulateFields) {
  const result: { [key: string]: CustomInputValue } = {}
  resetFormData(result, baseFields)
  return result
}

function resetFormData(formData: { [key: string]: CustomInputValue }, baseFields: FormulateFields) {
  const fieldKeys = Object.keys(baseFields)
  fieldKeys.forEach(key => {
    const type = baseFields[key].type
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

type MapFieldsFnItem = FormulateFields | FormulateField


function mapFields(
  baseFields: FormulateFields,
  fn: ((item: MapFieldsFnItem, index: number) => void) | null
): MapFieldsFnItem {
  const fieldKeys = Object.keys(baseFields)

  return fieldKeys.map((key, index) => {
    let item: MapFieldsFnItem
    if (key === '$footer') {
      const filed = baseFields[key] as FormulateField[]
      if (isArray(filed)) {
        item = filed as FormulateFields
      } else if (filed) {
        item = mapFields(filed, null) 
      }
    } else if (typeof key === 'string') {
      item = { ...baseFields[key], key }
    }
    
    fn && fn(item!, index)
    return item!
  })
}

function renderFormItem(item: FormulateField, index: number, children: VNodeChildren) {
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
    [item.itemPrefix, ...(children as VNodeChildrenArrayContents), item.itemSuffix]
  )
}

function useRules(props: FormulateProps) {
  const rules = ref<FormRules>({})
  const handleRules = (item: FormulateFields | FormulateField) => {
    const { type, key, label, rules: _rules } = item
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
  }
  return { rules, handleRules }
}

export default defineComponent({
  name: 'EFormulate',
  props: formulateProps,
  setup(_props, context) {
    const props = _props.data ? _props.data : _props

    if (!props.fields) {
      throw new Error('[ElementPart] "fields" attribute is required');
    }

    const formData = ref(initFormData(props.fields))
    const { rules, handleRules } = useRules(props)
    const fields = mapFields(props.fields, handleRules)

    const { elForm, validate, validateField, clearValidate } = useElForm()

    function resetFields() {
      resetFormData(formData.value, props.fields!)
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
      (fields as FormulateField[])?.map((item, index) => item.vIf && !item.vIf(formData.value)
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
