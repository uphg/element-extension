import { defineComponent } from "vue"
import { inputProps } from "./inputProps";
import { useInput } from "./useInput";

export default defineComponent({
  name: 'EInput',
  props: inputProps,
  inheritAttrs: false,
  setup(props, context) {
    return useInput(props, context)
  }
})
