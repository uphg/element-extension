import { defineComponent } from "vue";
import { timePickerProps } from "./dateProps";
import { useDatePicker } from "./useDatePicker";
import { ElementPartComponent } from "../../../../types/_common"

const ETimePicker = defineComponent({
  name: 'ETimePicker',
  props: timePickerProps,
  setup(props, context) {
    const { expose, render } = useDatePicker(props, context, { type: 2 })
    context.expose(expose)
    return render
  }
})

export default ETimePicker as ElementPartComponent<typeof ETimePicker>
