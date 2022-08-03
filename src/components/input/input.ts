import { defineComponent } from "vue"
import { useInput } from "../../composables/use-input"
import { inputProps } from "../../shared/input-props"

export default defineComponent({
  name: 'SInput',
  props: inputProps,
  setup(props, context) {
    const { render, expose } = useInput(props, context)
    expose && context.expose(expose)
    return render
  }
})
