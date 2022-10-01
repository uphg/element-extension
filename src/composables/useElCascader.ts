import { ref } from "vue"
import { ElCalendar } from "../../types/_element-ui"

export function useElCascader() {
  const elCascader = ref<ElCalendar | null>(null)
  return {
    elCascader,
    getCheckedNodes(leafOnly: boolean) {
      return elCascader.value?.getCheckedNodes(leafOnly)
    }
  }
}