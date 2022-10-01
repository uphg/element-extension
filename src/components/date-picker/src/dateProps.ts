import { sizeProp, empty, booleanProp, stringProp, objectProp } from "../../../shared/commonProps";
import { ExtractPropTypes, PropType } from "vue";

export type GlobalDateProps = ExtractPropTypes<typeof globalDateProps>
export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>
export type TimePickerProps = ExtractPropTypes<typeof timePickerProps>
export type TimeSelectProps = ExtractPropTypes<typeof timeSelectProps>
export type PublicDateProps = ExtractPropTypes<typeof dateProps>

export type DateType = 'date' | 'year' | 'month' | 'dates' | 'week' | 'daterange' | 'monthrange' | 'datetime' | 'datetimerange' | 'time' | 'time-select' | 'time-picker'

const defaultNull = {
  default: '',
}
const datePickerTypes = ['date', 'year', 'month', 'dates', 'week', 'daterange', 'monthrange', 'datetime', 'datetimerange',]

export const globalDateProps = {
  size: sizeProp,
  editable: {
    type: booleanProp,
    default: empty // true
  },
  clearable: booleanProp,
  placeholder: {
    type: stringProp,
    default: empty
  },
  startPlaceholder: {
    type: stringProp,
    default: empty
  },
  endPlaceholder: {
    type: stringProp,
    default: empty
  },
  format: {
    type: stringProp,
    default: empty
  },
  align: {
    type: stringProp,
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
    type: stringProp,
    default: empty
  },
  unlinkPanels: {
    type: booleanProp,
    default: empty
  },
  popperClass: {
    type: stringProp,
    default: empty
  },
  pickerOptions: {
    type: objectProp,
    default: empty // {}
  },
  prefixIcon: {
    type: stringProp,
    default: empty
  },
  clearIcon: {
    type: stringProp,
    default: empty // 'el-icon-circle-close'
  },
  validateEvent: {
    type: booleanProp,
    default: empty // true
  },
}

export const dateProps = {
  value: {},
  name: defaultNull,
  id: defaultNull,
  readonly: booleanProp,
  disabled: booleanProp,
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
  timeArrowControl: booleanProp
}

export const timePickerProps = {
  ...dateProps,
  isRange: booleanProp,
  arrowControl: booleanProp,
}

export const timeSelectProps = {
  type: {
    type: stringProp, // ?...
    default: 'time-select'
  },
  ...dateProps
}
