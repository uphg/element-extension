import { defineComponent } from "vue";
import { checkboxGroupProps } from "./checkboxGroupProps";
import { useCheckboxGroup } from "./useCheckboxGroup";
import { ElementPartComponent } from "../../../../types/_common"

const ECheckboxGroup = defineComponent({
  name: 'ECheckboxGroup',
  props: checkboxGroupProps,
  setup(props, context) {
    const { render } = useCheckboxGroup(props, context)
    return render
  }
})

export default ECheckboxGroup as ElementPartComponent<typeof ECheckboxGroup>
