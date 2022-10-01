import { VueConstructor } from "vue"

export declare type ElementPartComponent<T> = {
  install: (Vue: VueConstructor) => void
} & T
