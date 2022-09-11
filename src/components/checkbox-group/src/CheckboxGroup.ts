import { defineComponent } from "vue";
import { checkboxGroupProps } from "./checkboxGroupProps";
import { useCheckboxGroup } from "./useCheckboxGroup";

const ECheckboxGroup = defineComponent({
  name: 'ECheckboxGroup',
  props: checkboxGroupProps,
  setup(props, context) {
    const { render } = useCheckboxGroup(props, context)
    return render
  }
})

export default ECheckboxGroup