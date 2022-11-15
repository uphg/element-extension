import { defineComponent } from "vue"
import { linkProps } from "./linkProps"
import { useLink } from "./useLink"

export default defineComponent({
  name: 'ELink',
  props: linkProps,
  setup(props, context) {
    const { render } = useLink(props, context)
    return render
  }
})
