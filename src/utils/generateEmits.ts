import { EmitFn } from "vue/types/v3-setup-context"

type Emits = { [key: string]: (...args: unknown[]) => void }

export function generateEmits(emit: EmitFn, emitNames: string[]) {
  const result: Emits = {}
  emitNames.forEach((key) => {
    result[key] = (...args) => {
      emit(key, ...args)
    }
  })
  return result
}
