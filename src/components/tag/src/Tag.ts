import { defineComponent } from "vue"
import { tagProps } from "./tagProps"
import { useTag } from "./useTag"

export default defineComponent({
  name: 'ETag',
  props: tagProps,
  setup(props, context) {
    const { render } = useTag(props, context)
    return render
  }
})
