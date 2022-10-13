import { defineComponent } from "vue"
import { buttonProps } from "./buttonProps";
import { useButton } from "./useButton";
import { ElementPartComponent } from "../../../../types/component"

const EButton = defineComponent({
  name: 'EButton',
  props: buttonProps,
  setup(props, context) {
    const { render } = useButton(props, context)
    return render
  }
})

export default EButton as ElementPartComponent<typeof EButton>
