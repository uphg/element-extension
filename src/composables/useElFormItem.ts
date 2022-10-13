import { ref } from "vue"
import { ElFormItem } from "../../types/_element-ui"

export function useElFormItem() {
  const elFormItem = ref<ElFormItem | null>(null)

  return {
    elFormItem,

    clearValidate() {
      elFormItem.value?.clearValidate()
    }
  }
}
