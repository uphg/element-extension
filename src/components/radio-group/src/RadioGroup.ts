import { defineComponent } from "vue";
import { radioGroupProps } from "./radioGroupProps";
import { useRadioGroup } from "./useRadioGroup";
import { ElementPartComponent } from "../../../../types/component"

const ERadioGroup = defineComponent({
  name: 'ERadioGroup',
  props: radioGroupProps,
  setup(props, context) {
    const { render } = useRadioGroup(props, context)
    return render
  }
})

export default ERadioGroup as ElementPartComponent<typeof ERadioGroup>
