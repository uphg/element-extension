import { ref } from "vue"
import { ElUpload } from "../types/element-components"
import { ElUploadInternalFileDetail } from "element-ui/types/upload"

export function useElUpload() {
  const elUpload = ref<ElUpload | null>(null)
  return {
    clearFiles() {
      elUpload.value!.clearFiles()
    },
    abort(file: ElUploadInternalFileDetail) {
      elUpload.value!.abort(file)
    },
    submit() {
      elUpload.value!.submit()
    },
    elUpload,
    setRef: ((el: ElUpload) => elUpload.value = el) as unknown as string
  }
}