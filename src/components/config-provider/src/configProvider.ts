import { defineComponent } from "vue"
import { configProviderProps } from "./configProviderProps"
import { useConfigProvider } from "./useConfigProvider"
import { ElementPartComponent } from "../../../../types/component"

const EConfigProvider = defineComponent({
  name: 'EConfigProvider',
  props: configProviderProps,
  setup(props, context) {
    return useConfigProvider(props, context)
  }
})

export default EConfigProvider as ElementPartComponent<typeof EConfigProvider>
