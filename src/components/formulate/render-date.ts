import { h, Ref, SetupContext } from 'vue'
import { DatePicker, TimeSelect, TimePicker } from 'element-ui'
import { ElForm } from 'element-ui/types/form';
import { ElDatePicker } from 'element-ui/types/date-picker';
import { PartialInputProps } from "../../types/formulate";
import { FormData } from '../../types/form'

function renderDate(
  props: PartialInputProps,
  _options: {
    formRef: Ref<HTMLElement | ElForm>;
    formData: Ref<FormData>;
    context: SetupContext<{}>;
  },
  type: 1 | 2 | 3 // 1: date, 2: time-select, 3: time-picker
) {
  const { formRef, formData, context } = _options
  const renderType = type || 0

  return h(renderType === 1
      ? DatePicker
      : (renderType === 2
        ? TimeSelect
        : TimePicker), {
    props: {
      value: formData.value[props.key],
      type: props.type,
      format: props.format,
      valueFormat: props.valueFormat,
      readonly: props.readonly,
      startPlaceholder: props.startPlaceholder,
      endPlaceholder: props.endPlaceholder,
      prefixIcon: props.prefixIcon,
      clearIcon: props.clearIcon,
      disabled: props.disabled,
      clearable: props.clearable,
      popperClass: props.popperClass,
      editable: props.editable,
      align: props.align,
      defaultValue: props.defaultValue,
      defaultTime: props.defaultTime,
      rangeSeparator: props.rangeSeparator,
      pickerOptions: props.pickerOptions,
      unlinkPanels: props.unlinkPanels,
      arrowControl: props.arrowControl,
      isRange: props.isRange,
      
      // 原生属性
      name: props.name,
      placeholder: props.placeholder,
    },
    on: {
      input(value: any) {
        formData.value[props.key] = value
      },
      change(value: any) {
        context.emit('change', value)
      },
      blur(event: ElDatePicker) {
        context.emit('blur', event)
      },
      focus(event: ElDatePicker) {
        context.emit('focus', event)
      }
    }
  })
}

export default renderDate