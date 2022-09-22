import { ElSelect } from "element-ui/types/select"
import { ref } from "vue"


export function useElSelect() {
  const elSelect = ref<ElSelect | null>(null)
  return {
    focus() {
      elSelect.value?.focus()
    },
    blur() {
      elSelect.value?.blur()
    },
    elSelect
  }
}