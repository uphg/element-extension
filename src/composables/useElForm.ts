import { ref } from "vue"
import { ElForm, ValidateCallback, ValidateFieldCallback } from "element-ui/types/form"

export function useElForm() {
  const elForm = ref<ElForm | null>(null)

  return {
    elForm,

    validate(callback: ValidateCallback) {
      elForm.value?.validate(callback)
    },

    validateField(props: string | string[], callback?: ValidateFieldCallback) {
      elForm.value?.validateField(props, callback)
    },

    clearValidate(props?: string | string[]) {
      elForm.value?.clearValidate(props)
    }
  }
}
