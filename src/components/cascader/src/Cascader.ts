import { ElementPartComponent } from "../../../../types/component"
import { defineComponent } from "vue"
import { cascaderProps } from "./cascaderProps"
import { useCascader } from "./useCascader"

const ECascader = defineComponent({
  name: 'ECascader',
  props: cascaderProps,
  setup(props, context) {
    const { expose, render } = useCascader(props, context)
    context.expose(expose)
    return render
  }
})

export default ECascader as ElementPartComponent<typeof ECascader>