import { defineComponent } from "vue";
import { usexxx } from './usexxx'
import { xxx } from "./xxxProps";

const Exxx = defineComponent({
  name: 'Exxx',
  props: xxx,
  setup(props, context) {
    const { render } = usexxx(props, context)
    return render
  }
})

export default Exxx