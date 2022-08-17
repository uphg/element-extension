import { ref } from "vue"
import { ElFormItem } from "element-ui/types/form-item"

function useElFormItem() {
  const elFormItem = ref<ElFormItem | null>(null)

  return {
    elFormItem,

    clearValidate() {
      elFormItem.value?.clearValidate()
    }
  }
}

export default useElFormItem