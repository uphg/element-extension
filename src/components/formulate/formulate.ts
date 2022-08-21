import { defineComponent, h, ref, VNodeChildren } from "vue"
import { Col, Form, FormItem, Row } from "element-ui"
import { VNodeChildrenArrayContents } from "vue/types/umd"
import { isArray, isObject } from "../../utils"
import renderCustomInput from './renderCustomInput'
import { CustomInputValue } from "../../types/customInput"
import { FormRules, FormData } from '../../types/form'
import useElForm from '../../composables/useElForm'
import { FormulateField, FormulateFields, formulateProps, FormulateProps } from "../../shared/formulateProps"

interface MapFieldsItem extends FormulateField {
  key: string;
}

function initFormData(baseFields: FormulateFields | FormulateFields[]) {
  const result: { [key: string]: CustomInputValue } = {}
  resetFormData(result, baseFields)
  return result
}

function resetFormData(formData: { [key: string]: CustomInputValue }, baseFields: FormulateFields | FormulateFields[]) {
  const fieldKeys = Object.keys(baseFields)
  if (isArray(baseFields)) {
    baseFields.forEach((item) => {
      resetFormData(formData, item)
    })
  } else {
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
}

function useRules(props: FormulateProps) {
  const rules = ref<FormRules>({})
  const handleRules = (item: MapFieldsItem) => {
    const { type, key, label, rules: _rules } = item
    const propRules = props.expands.rules || props.rules
    const propMapRules = props.expands.mapRules || props.mapRules
    if (_rules && isObject(_rules)) {
      rules.value[key] = isArray(_rules) ?  _rules : [_rules]
    } else if (propRules && propRules?.[key]) {
      rules.value[key] = propRules?.[key]
    } else if (propMapRules) {
      if (typeof propMapRules !== 'function') {
        throw new Error('[ElementPart] "mapRules" must be a function and return an array')
      }
      const rule = propMapRules({ type, key, label })
      rule && rule.length && (rules.value[key] = rule) 
    }
  }
  return { rules, handleRules }
}

function mapFields(
  baseFields: FormulateFields | FormulateFields[],
  fn: ((item: MapFieldsItem) => void) | null
): MapFieldsItem[] | MapFieldsItem[][] {
  if (isArray(baseFields)) {
    return baseFields.map((_baseFields) => mapFields(_baseFields, fn)) as MapFieldsItem[][]
  } else {
    const fieldKeys = Object.keys(baseFields)
    return fieldKeys.map<MapFieldsItem>((key) => {
      const item: MapFieldsItem = {...baseFields[key], key}
      fn && fn(item)
      return item
    })
  }
}

function renderFormItem(item: MapFieldsItem, index: string | number, children: VNodeChildren) {

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
    [
      item.itemPrefix,
      ...(children as VNodeChildrenArrayContents),
      item.extra && (
        typeof item.extra === 'string'
          ? h('div', { class: 'e-formulate__extra', domProps: { innerHTML: item.extra } })
          : [item.extra]
      ),
      item.itemSuffix
    ]
  )
}

export default defineComponent({
  name: 'EFormulate',
  props: formulateProps,
  setup(props, context) {
    const propFields = props.expands.fields || props.fields
    if (!propFields) {
      throw new Error('[ElementPart] "fields" attribute is required');
    }

    const formData = ref(initFormData(propFields))
    const { rules, handleRules } = useRules(props)

    const formulateFields = ref<MapFieldsItem[] | Array<MapFieldsItem[]>>(mapFields(propFields, handleRules))

    const { elForm, validate, validateField, clearValidate } = useElForm()

    function resetFields() {
      resetFormData(formData.value, propFields!)
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

    function renderFormBlock(item: MapFieldsItem, id: string | number) {
      return item.vIf && !item.vIf(formData.value)
      ? null
      : renderFormItem(item, id, 
        (isArray(item)
          ? item.map((piece, i) => renderCustomInput(piece, { elForm, formData, context }))
          : [renderCustomInput(item, { elForm, formData, context })]
        )
      )
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

    return () => {
      return h(Form, {
        // @ts-ignore
        ref: (el) => elForm.value = el,
        props: {
          rules: rules.value,
          model: formData.value,
          labelPosition: props.expands.labelPosition || props.labelPosition,
          labelWidth: props.expands.labelWidth || props.labelWidth,
          labelSuffix: props.expands.labelSuffix || props.labelSuffix,
          inline: props.expands.inline || props.inline,
          inlineMessage: props.expands.inlineMessage || props.inlineMessage,
          statusIcon: props.expands.statusIcon || props.statusIcon,
          showMessage: props.expands.showMessage || props.showMessage,
          size: props.expands.size || props.size,
          disabled: props.expands.disabled || props.disabled,
          validateOnRuleChange: props.expands.validateOnRuleChange || props.validateOnRuleChange,
          hideRequiredAsterisk: props.expands.hideRequiredAsterisk || props.hideRequiredAsterisk
        }
      },
      isArray(propFields)
        ? [h(Row, (formulateFields.value as MapFieldsItem[][]).map(
          (row: MapFieldsItem[], rowId) => h(Col, { props: { span: 24 / (Number(propFields?.length) || 0) }, }, row.map(
            (formItem: MapFieldsItem, index: number) => renderFormBlock(formItem, `${rowId}-${index}`)
          ))
        ))]
        : (formulateFields.value as MapFieldsItem[]).map((formItem: MapFieldsItem, index: number) => renderFormBlock(formItem, index))
      )
    }
  }
})
