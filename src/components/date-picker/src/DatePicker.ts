import { ElementPartComponent } from "../../../types";
import { defineComponent } from "vue";
import { datePickerProps } from "./datePickerProps";
import { useDatePicker } from "./useDatePicker";

const EDatePicker = defineComponent({
  name: 'EDatePicker',
  props: datePickerProps,
  setup(props, context) {
    const { render } = useDatePicker(props, context)
    return render
  }
})

export default EDatePicker as ElementPartComponent<typeof EDatePicker>