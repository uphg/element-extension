import { defineComponent } from "vue";
import { datePickerProps } from "./dateProps";
import { useDatePicker } from "./useDatePicker";
import { ElementPartComponent } from "../../../../types/component"

const EDatePicker = defineComponent({
  name: 'EDatePicker',
  props: datePickerProps,
  setup(props, context) {
    const { expose, render } = useDatePicker(props, context, { type: 1 })
    context.expose(expose)
    return render
  }
})

export default EDatePicker as ElementPartComponent<typeof EDatePicker>
