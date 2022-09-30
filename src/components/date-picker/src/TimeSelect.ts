import { defineComponent } from "vue";
import { timeSelectProps } from "./dateProps";
import { useDatePicker } from "./useDatePicker";
import { ElementPartComponent } from "../../../../types/_common"

const ETimeSelect = defineComponent({
  name: 'ETimeSelect',
  props: timeSelectProps,
  setup(props, context) {
    const { expose, render } = useDatePicker(props, context, { type: 3 })
    context.expose(expose)
    return render
  }
})

export default ETimeSelect as ElementPartComponent<typeof ETimeSelect>
