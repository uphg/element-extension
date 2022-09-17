import { ExtractPropTypes, PropType } from "vue";

export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>
export type DatePickerType = 'date' | 'year' | 'month' | 'dates' | 'week' | 'daterange' | 'monthrange' | 'datetime' | 'datetimerange' | 'time' | 'time-select' | 'time-picker'

const dateType = ['date', 'year', 'month', 'dates', 'week', 'daterange', 'monthrange', 'datetime', 'datetimerange', 'time', 'time-select', 'time-picker']

export const datePickerProps = {
  type: {
    type: String as PropType<DatePickerType>,
    default: 'date',
    validator(value: string) {
      return dateType.includes(value)
    }
  },
  size: String,
  format: String,
  valueFormat: String,
  readonly: Boolean,
  placeholder: String,
  startPlaceholder: String,
  endPlaceholder: String,
  prefixIcon: String,
  clearIcon: {
    type: String,
    default: 'el-icon-circle-close'
  },
  name: {
    default: '',
  },
  disabled: Boolean,
  clearable: {
    type: Boolean,
    default: true
  },
  id: {
    default: '',
  },
  popperClass: String,
  editable: {
    type: Boolean,
    default: true
  },
  align: {
    type: String,
    default: 'left'
  },
  value: {},
  defaultValue: {},
  defaultTime: {},
  rangeSeparator: {
    default: '-'
  },
  pickerOptions: {},
  unlinkPanels: Boolean,
  validateEvent: {
    type: Boolean,
    default: true
  },

  // time picker
  isRange: Boolean,
  arrowControl: Boolean,

  // date picker
  timeArrowControl: Boolean
}