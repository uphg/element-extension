import { h, SetupContext } from "vue"
import { DatePicker as _DatePicker, TimeSelect, TimePicker } from "element-ui"
import { DatePickerProps } from "./datePickerProps"
import { useComponentProps } from "../../../composables/useComponentProps"
import { ElDatePicker } from "element-ui/types/date-picker"
import { ElTimePicker } from "element-ui/types/time-picker"
import { ElTimeSelect } from "element-ui/types/time-select"

const publicPropNames = ['size', 'format', 'valueFormat', 'readonly', 'placeholder', 'startPlaceholder', 'endPlaceholder', 'prefixIcon', 'clearIcon', 'name', 'disabled', 'clearable', 'id', 'popperClass', 'editable', 'align', 'value', 'defaultValue', 'defaultTime', 'rangeSeparator', 'pickerOptions', 'unlinkPanels', 'validateEvent', 'isRange', 'arrowControl', 'timeArrowControl']

// const datePickerTypes = ['date', 'year', 'month', 'dates', 'week', 'daterange', 'monthrange', 'datetime', 'datetimerange']
// const timeSelectTypes = ['time', 'time-select']
// const timePickerTypes = ['timerange', 'time-picker']

// function getDateComponent(type: string) {
//   switch (type) {
//     case 'date':
//     case 'year':
//     case 'month':
//     case 'dates':
//     case 'week':
//     case 'daterange':
//     case 'monthrange':
//     case 'datetime':
//     case 'datetimerange':
//       return { component: _DatePicker, status: 0 }
//     case 'time':
//     case 'time-select':
//       return { component: TimeSelect, status: 1 }
//     case 'timerange':
//     case 'time-picker':
//       return { component: TimePicker, status: 2 }
//   }
// }

export function useDatePicker(props: DatePickerProps, context: SetupContext<{}>) {
  const type = props.type === 'time' || props.type === 'time-picker'
    ? (props.isRange ? 'timerange' : 'time')
    : props.type

  let DatePicker: typeof TimeSelect | typeof TimePicker | typeof _DatePicker | null = null
  let status: number | null = null
  switch (type) {
    case 'time':
    case 'timerange':
    // case 'time-picker':
      DatePicker = TimePicker
      status = 0
      break;
    case 'time-select':
      DatePicker = TimeSelect
      status = 1
      break;
    default:
      DatePicker = _DatePicker
      status = 2
  }

  const propNames = [publicPropNames, ...(status === 0 ? [] : (status === 2 ? ['type', 'timeArrowControl'] : ['type']))]

  const { createProps } = useComponentProps(props, null, {propNames} )
  return {
    render() {
      return h(DatePicker!, {
        props: {
          
        }
      })
    }
  }
}