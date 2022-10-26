import { defineComponent } from "vue"
import { timeSelectProps } from "./dateProps"
import { useDatePicker } from "./useDatePicker"

export default defineComponent({
  name: 'ETimeSelect',
  props: timeSelectProps,
  setup(props, context) {
    const { expose, render } = useDatePicker(props, context, { type: 3 })
    context.expose(expose)
    return render
  }
})
