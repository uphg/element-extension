import { defineComponent } from "vue"
import { sliderProps } from "./sliderProps"
import { useSlider } from "./useSlider"

export default defineComponent({
  name: 'ESlider',
  props: sliderProps,
  setup(props, context) {
    const { expose, render } = useSlider(props, context)
    context.expose(expose)

    return render
  }
})
