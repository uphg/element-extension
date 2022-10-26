import { defineComponent } from "vue"
import { radioGroupProps } from "./radioGroupProps"
import { useRadioGroup } from "./useRadioGroup"

export default defineComponent({
  name: 'ERadioGroup',
  props: radioGroupProps,
  setup(props, context) {
    const { render } = useRadioGroup(props, context)
    return render
  }
})
