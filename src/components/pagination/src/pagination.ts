import { defineComponent } from "vue"
import { paginationProps } from "./paginationProps"
import { usePagination } from "./usePagination"
import { ElementPartComponent } from "../../../types"

const EPagination = defineComponent({
  name: 'EPagination',
  props: paginationProps,
  inheritAttrs: false,
  setup(props, context) {
    const { render } = usePagination(props, context)
    return render
  }
})


export default EPagination as ElementPartComponent<typeof EPagination>