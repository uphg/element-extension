import DatePicker from './src/DatePicker'
import { datePickerProps } from './src/datePickerProps'
import { useDatePicker } from './src/useDatePicker'

DatePicker.install = function (Vue) {
  Vue.component(DatePicker.name, DatePicker);
}

export { DatePicker, datePickerProps, useDatePicker }
