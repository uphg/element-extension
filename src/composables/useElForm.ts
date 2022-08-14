import { ref, Ref } from "vue"
import { ElForm, ValidateCallback, ValidateFieldCallback } from "element-ui/types/form"

function useElForm() {
  const elFormRef = ref<ElForm | null>(null)

  return {
    elFormRef,

    validate(callback: ValidateCallback) {
      elFormRef.value?.validate(callback)
    },

    validateField(props: string | string[], callback?: ValidateFieldCallback) {
      elFormRef.value?.validateField(props, callback)
    },

    clearValidate(props?: string | string[]) {
      elFormRef.value?.clearValidate(props)
    }
  }
}

export default useElForm