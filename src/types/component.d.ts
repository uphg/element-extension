// import Vue from 'vue'

// /** ElementUI component common definition */
// export declare class SimElementComponent extends Vue {
//   /** Install component into Vue */
//   static install (vue: typeof Vue): void
// }

import { VueConstructor } from "vue"

export declare type ElementPartComponent<T> = {
  install: (Vue: VueConstructor) => void
} & T

