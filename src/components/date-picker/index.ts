import DatePicker from './src/DatePicker'
import TimePicker from './src/TimePicker'
import TimeSelect from './src/TimeSelect'
import { datePickerProps, timePickerProps, timeSelectProps } from './src/dateProps'
import { useDatePicker } from './src/useDatePicker'
import { withInstall } from '../../utils'

const EDatePicker = withInstall(DatePicker)
const ETimePicker = withInstall(TimePicker)
const ETimeSelect = withInstall(TimeSelect)

export {
  DatePicker, EDatePicker, datePickerProps,
  TimePicker, ETimePicker, timePickerProps,
  TimeSelect, ETimeSelect, timeSelectProps,
  useDatePicker
}
