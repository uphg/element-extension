import { PropType } from "vue";
import { ElementUIComponentSize } from "element-ui/types/component";

function noop() { }

export const empty = void 0

export const booleanProp = Boolean as PropType<boolean>

export const commonProps = {
  disabled: booleanProp,
  readonly: booleanProp,
  loading: booleanProp,
  popperClass: String as PropType<string>,
  debounce: {
    type: Number,
    default: 300
  },

  // global props
  size: {
    type: String as PropType<ElementUIComponentSize>,
    default: empty
  },
  clearable: {
    type: [Boolean, undefined] as PropType<boolean>,
    default: empty
  },
}

export const elFormProps = {

}