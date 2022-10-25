import { VueConstructor } from "vue"
import { Plugin } from "@vue/runtime-dom"

type SFCWithInstall<T> = T & Plugin
