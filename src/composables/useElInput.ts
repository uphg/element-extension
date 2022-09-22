import { ElInput } from "element-ui/types/input"
import { ref } from "vue"

export function useElInput() {
  const elInput = ref<ElInput | null>(null)
  return {
    focus() {
      elInput.value?.focus()
    },
    blur() {
      elInput.value?.blur()
    },
    select() {
      elInput.value?.select()
    },
    elInput
  }
}