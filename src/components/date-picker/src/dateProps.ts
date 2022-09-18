import { commonProps, empty } from "../../../shared/_commonProps";
import { ExtractPropTypes, PropType } from "vue";

export type GlobalDateProps = ExtractPropTypes<typeof globalDateProps>
export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>
export type TimePickerProps = ExtractPropTypes<typeof timePickerProps>
export type TimeSelectProps = ExtractPropTypes<typeof timeSelectProps>
export type PublicDateProps = ExtractPropTypes<typeof dateProps>

export type DateType = 'date' | 'year' | 'month' | 'dates' | 'week' | 'daterange' | 'monthrange' | 'datetime' | 'datetimerange' | 'time' | 'time-select' | 'time-picker'

const datePickerTypes = ['date', 'year', 'month', 'dates', 'week', 'daterange', 'monthrange', 'datetime', 'datetimerange',]

export const globalDateProps = {
  size: {
    type: commonProps.size.type,
    default: empty
  },
  editable: {
    type: Boolean,
    default: empty // true
  },
  clearable: {
    type: Boolean,
    default: empty // true
  },
  placeholder: {
    type: String,
    default: empty
  },
  startPlaceholder: {
    type: String,
    default: empty
  },
  endPlaceholder: {
    type: String,
    default: empty
  },
  format: {
    type: String,
    default: empty
  },
  align: {
    type: String,
    default: empty // 'left'
  },
  rangeSeparator: {
    type: [String, Number],
    default: empty // '-'
  },
  defaultValue: {
    type: [Date, Number] as PropType<Date | number>,
    default: empty
  },
  defaultTime: {
    type: [String, Array] as PropType<string | string[]>,
    default: empty
  },
  valueFormat: {
    type: String,
    default: empty
  },
  unlinkPanels: {
    type: Boolean,
    default: empty
  },
  popperClass: {
    type: String,
    default: empty
  },
  pickerOptions: {
    type: Object,
    default: empty // {}
  },
  prefixIcon: {
    type: String,
    default: empty
  },
  clearIcon: {
    type: String,
    default: empty // 'el-icon-circle-close'
  },
  validateEvent: {
    type: Boolean,
    default: empty // true
  },
}

export const dateProps = {
  readonly: Boolean,
  name: {
    default: '',
  },
  disabled: Boolean,
  id: {
    default: '',
  },
  value: {},
  ...globalDateProps
}

export const datePickerProps = {
  type: {
    type: String as PropType<DateType>,
    default: 'date',
    validator(value: string) {
      return datePickerTypes.includes(value)
    }
  },
  ...dateProps,
  timeArrowControl: Boolean
}

export const timePickerProps = {
  ...dateProps,
  isRange: Boolean,
  arrowControl: Boolean,
}

export const timeSelectProps = {
  type: {
    type: String,
    default: 'time-select'
  },
  ...dateProps
}
