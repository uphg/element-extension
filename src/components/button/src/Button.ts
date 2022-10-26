import { defineComponent } from "vue"
import { buttonProps } from "./buttonProps";
import { useButton } from "./useButton";

export default defineComponent({
  name: 'EButton',
  props: buttonProps,
  setup(props, context) {
    const { render } = useButton(props, context)
    return render
  }
})
