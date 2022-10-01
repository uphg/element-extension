import { ref } from "vue"
import { ElUploadInternalFileDetail } from "element-ui/types/upload"
import { ElUpload } from "../../types/_element-ui"

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
    elUpload
  }
}