import { defineComponent } from "vue"
import { uploadProps } from "./uploadProps"
import { useUpload } from "./useUpload"

export default defineComponent({
  name: 'EUpload',
  props: uploadProps,
  setup(props, context) {
    const { expose, render } = useUpload(props, context)
    context.expose(expose)
    return render
  }
})
