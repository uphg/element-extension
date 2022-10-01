import { PropType } from "vue";
import { ElementUIComponentSize } from "element-ui/types/component";
import { ObjectLike } from "../../types/_common";

export const empty = void 0

export const booleanProp = Boolean as PropType<boolean>
export const stringProp = String as PropType<string>
export const numberProp = Number as PropType<number>
export const objectProp = Object as PropType<ObjectLike>
export const sizeProp = {
  type: String as PropType<ElementUIComponentSize>,
  default: empty
}

export const commonProps = {
  popperClass: String as PropType<string>,
  debounce: {
    type: Number,
    default: 300
  }
}

export const elFormProps = {
  
}