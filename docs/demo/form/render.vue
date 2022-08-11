<script lang="ts">
import { Form, FormItem } from "src/index"
import { defineComponent, h } from "vue"

export default defineComponent({
  name: 'DemoFormSetupRender',
  setup() {
    const formProps = {
      model: "formData",
      rules: "rules",
      ref: "formRef",
      labelWidth:"100px"
    }

    return () => h(Form, {
      props: formProps
    })
  }
})
</script>