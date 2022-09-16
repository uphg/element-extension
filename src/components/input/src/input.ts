import { ElementPartComponent } from "../../../types/component";
import { defineComponent } from "vue"
import { inputProps } from "./inputProps";
import { useInput } from "./useInput";

const EInput = defineComponent({
  name: 'EInput',
  props: inputProps,
  inheritAttrs: false,
  setup(props, context) {
    const { expose, render } = useInput(props, context)
    context.expose(expose)
    return render
  }
})

export default EInput as ElementPartComponent<typeof EInput>
