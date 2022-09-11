import { defineComponent } from "vue"
import { uploadProps } from "./uploadProps"
import { useUpload } from "./useUpload"

const EUpload = defineComponent({
  name: 'EUpload',
  props: uploadProps,
  setup(props, context) {
    const { expose, render } = useUpload(props, context)
    context.expose(expose)
    return render
  }
})

export default EUpload
