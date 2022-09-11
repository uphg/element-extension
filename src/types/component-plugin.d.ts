import { VueConstructor } from "vue"

export declare type ComponentPlugin<T> = {
  install: (Vue: VueConstructor) => void
} & T
