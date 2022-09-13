import { defineComponent } from "vue";
import { useSwitch } from './useSwitch'
import { switchProps } from "./switchProps";

const ESwitch = defineComponent({
  name: 'ESwitch',
  props: switchProps,
  setup(props, context) {
    const { expose, render } = useSwitch(props, context)
    context.expose(expose)
    return render
  }
})

export default ESwitch