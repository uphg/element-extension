import { ElCalendar } from "../types/element-components"
import { ref } from "vue"

export function useElCascader() {
  const elCascader = ref<ElCalendar | null>(null)
  return {
    elCascader,
    setRef: ((el: ElCalendar) => elCascader.value = el) as unknown as string,
    getCheckedNodes(leafOnly: boolean) {
      return elCascader.value?.getCheckedNodes(leafOnly)
    }
  }
}