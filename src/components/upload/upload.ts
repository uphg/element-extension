import { Upload } from "element-ui"
import { defineComponent, h } from "vue"

export default defineComponent({
  name: 'SUpload',
  props: {
  },
  setup(props, context) {
     return () => h(Upload, {
      props
     })
  }
})