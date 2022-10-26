import { defineComponent } from "vue"
import { configProviderProps } from "./configProviderProps"
import { useConfigProvider } from "./useConfigProvider"

export default defineComponent({
  name: 'EConfigProvider',
  props: configProviderProps,
  setup(props, context) {
    return useConfigProvider(props, context)
  }
})
