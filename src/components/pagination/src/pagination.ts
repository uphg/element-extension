import { defineComponent } from "vue"
import { paginationProps } from "./paginationProps"
import { usePagination } from "./usePagination"

export default defineComponent({
  name: 'EPagination',
  props: paginationProps,
  inheritAttrs: false,
  setup(props, context) {
    const { expose, render } = usePagination(props, context)
    context.expose(expose)
    return render
  }
})
