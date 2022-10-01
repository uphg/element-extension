import { defineComponent } from "vue"
import { inputNumberProps } from "./inputNumberProps";
import { useInputNumber } from "./useInputNumber";
import { ElementPartComponent } from "../../../../types/component"

const EInputNumber = defineComponent({
  name: 'EInputNumber',
  props: inputNumberProps,
  inheritAttrs: false,
  setup(props, context) {
    const { expose, render } = useInputNumber(props, context)
    context.expose(expose)
    return render
  }
})

export default EInputNumber as ElementPartComponent<typeof EInputNumber>
