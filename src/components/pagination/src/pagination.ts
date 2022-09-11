import { defineComponent } from "vue"
import { paginationProps } from "./paginationProps"
import { usePagination } from "./usePagination"

const EPagination = defineComponent({
  name: 'EPagination',
  props: paginationProps,
  inheritAttrs: false,
  setup(props, context) {
    const { render } = usePagination(props, context)
    return render
  }
})


export default EPagination