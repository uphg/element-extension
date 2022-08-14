<script lang="ts">
import { Form, FormItem } from "src/index"
import { ref, defineComponent, h } from "vue"

export default defineComponent({
  name: 'DemoFormSetupRender',
  setup() {
    const labelWidth = ref('100px')

    return () => h(Form, {
      props: {
        labelWidth: labelWidth.value
      }
    })
  }
})
</script>