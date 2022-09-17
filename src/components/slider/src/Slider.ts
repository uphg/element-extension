import { defineComponent } from "vue"
import { sliderProps } from "./sliderProps"
import { useSlider } from "./useSlider"
import { ElementPartComponent } from "../../../types/component"

const ESlider = defineComponent({
  name: 'ESlider',
  props: sliderProps,
  setup(props, context) {
    const { expose, render } = useSlider(props, context)
    context.expose(expose)

    return render
  }
})

export default ESlider as ElementPartComponent<typeof ESlider>
