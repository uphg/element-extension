import { defineComponent } from "vue"
import { timePickerProps } from "./dateProps"
import { useDatePicker } from "./useDatePicker"

export default defineComponent({
  name: 'ETimePicker',
  props: timePickerProps,
  setup(props, context) {
    const { expose, render } = useDatePicker(props, context, { type: 2 })
    context.expose(expose)
    return render
  }
})
