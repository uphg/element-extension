import { defineComponent } from "vue"
import { paginationProps } from "./paginationProps"
import { usePagination } from "./usePagination"

export default defineComponent({
  name: 'EInput',
  props: paginationProps,
  inheritAttrs: false,
  setup(props, context) {
    return usePagination(props, context)
  }
})
