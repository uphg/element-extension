import DatePicker from './src/DatePicker'
import TimePicker from './src/TimePicker'
import TimeSelect from './src/TimeSelect'
import { datePickerProps, timePickerProps, timeSelectProps } from './src/dateProps'
import { useDatePicker } from './src/useDatePicker'

DatePicker.install = function (Vue) {
  Vue.component(DatePicker.name, DatePicker);
}

TimePicker.install = function (Vue) {
  Vue.component(TimePicker.name, TimePicker);
}

TimeSelect.install = function (Vue) {
  Vue.component(TimeSelect.name, TimeSelect);
}

export {
  DatePicker, datePickerProps,
  TimePicker, timePickerProps,
  TimeSelect, timeSelectProps,
  useDatePicker
}
