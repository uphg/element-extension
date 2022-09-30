import { defineComponent } from "vue";
import { useSwitch } from './useSwitch'
import { switchProps } from "./switchProps";
import { ElementPartComponent } from "../../../../types/_common"

const ESwitch = defineComponent({
  name: 'ESwitch',
  props: switchProps,
  setup(props, context) {
    const { expose, render } = useSwitch(props, context)
    context.expose(expose)
    return render
  }
})

export default ESwitch as ElementPartComponent<typeof ESwitch>