import { h, ref, SetupContext, VNodeChildren } from "vue"
import { Col, Form, FormItem, Row } from "element-ui"
import { VNodeChildrenArrayContents } from "vue/types/umd"
import { isArray, isObject } from "../../../utils"
import renderCustomInput from './renderCustomInput'
import { CustomInputValue } from "../../../types/customInput"
import { FormRules, FormData } from '../../../types/form'
import { useElForm } from '../../../composables/useElForm'
import { FormulateField, FormulateFields, FormulateProps } from "./formulateProps"
import { GlobalFormProps, GlobalInputProps } from "../../../components/config-provider/src/configProviderProps"
import { useGlobalProps } from "../../../composables/useGlobalProps"
import { handleProps } from "../../../utils/handleProps"
import { ElForm } from "element-ui/types/form"

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
    const baseRules = props.rules
    if (_rules && isObject(_rules)) {
      rules.value[key] = isArray(_rules) ?  _rules : [_rules]
    } else if (baseRules && (baseRules as FormRules)?.[key]) {
      rules.value[key] = (baseRules as FormRules)?.[key]
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

export function useFormulate(_props: FormulateProps, context: SetupContext<{}>) {
  const props = _props.expands || _props
  if (!props.fields) {
    throw new Error('[ElementPart] "fields" attribute is required');
  }

  const formData = ref(initFormData(props.fields))
  const { rules, handleRules } = useRules(props)

  const formulateFields = ref<MapFieldsItem[] | Array<MapFieldsItem[]>>(mapFields(props.fields, handleRules))

  const { elForm, validate, validateField, clearValidate } = useElForm()
  const globalInputProps = useGlobalProps<GlobalInputProps>('input')
  const globalFormProps = useGlobalProps<GlobalFormProps>('form')

  const setRef = function(el: ElForm) {
    elForm.value = el
  } as unknown as string


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

  function renderFormBlock(item: MapFieldsItem, id: string | number) {
    return item.vIf && !item.vIf(formData.value)
    ? null
    : renderFormItem(item, id, 
      (isArray(item)
        ? item.map((piece, i) => renderCustomInput(piece, { elForm, formData, context, globalInputProps }))
        : [renderCustomInput(item, { elForm, formData, context, globalInputProps })]
      )
    )
  }

  return {
    expose: {
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
    },
    render: () => {
      return h(Form, {
        ref: setRef,
        props: {
          rules: rules.value,
          model: formData.value,
          labelSuffix: props.labelSuffix,
          statusIcon: props.statusIcon,
          showMessage: props.showMessage,
          disabled: props.disabled,
          validateOnRuleChange: props.validateOnRuleChange,
          hideRequiredAsterisk: props.hideRequiredAsterisk,
          ...handleProps<GlobalFormProps>(props as GlobalFormProps, globalFormProps, ['labelPosition', 'labelWidth', 'inline', 'inlineMessage', 'size'])
        }
      },
      isArray(props.fields)
        ? [h(Row, (formulateFields.value as MapFieldsItem[][]).map(
          (row: MapFieldsItem[], rowId) => h(Col, { props: { span: 24 / (Number(props.fields?.length) || 0) }, }, row.map(
            (formItem: MapFieldsItem, index: number) => renderFormBlock(formItem, `${rowId}-${index}`)
          ))
        ))]
        : (formulateFields.value as MapFieldsItem[]).map((formItem: MapFieldsItem, index: number) => renderFormBlock(formItem, index))
      )
    }
  }
}