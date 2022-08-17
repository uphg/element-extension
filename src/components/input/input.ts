import { defineComponent, h, PropType } from "vue"
import { Input } from "element-ui"
import { pick } from "../../utils";

const inputPropNames = [
  'value',
  'size',
  'resize',
  'form',
  'disabled',
  'readonly',
  'type',
  'autosize',
  'autocomplete',
  'autoComplete',
  'validateEvent',
  'suffixIcon',
  'prefixIcon',
  'label',
  'clearable',
  'showPassword',
  'showWordLimit',
  'tabindex'
]

const inputProps = {
  value: [String, Number] as PropType<string | number>,
  size: String as PropType<string | number>,
  resize: String as PropType<string>,
  form: String as PropType<string>,
  disabled: Boolean as PropType<boolean>,
  readonly: Boolean as PropType<boolean>,
  type: {
    type: String as PropType<string>,
    default: 'text'
  },
  autosize: {
    type: [Boolean, Object] as PropType<boolean | { [key: string]: any }>,
    default: false
  },
  autocomplete: {
    type: String as PropType<string>,
    default: 'off'
  },
  /** @Deprecated in next major version */
  autoComplete: {
    type: String as PropType<string>,
    validator() {
      process.env.NODE_ENV !== 'production' &&
        console.warn('[Element Warn][Input]\'auto-complete\' property will be deprecated in next major version. please use \'autocomplete\' instead.');
      return true;
    }
  },
  validateEvent: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  suffixIcon: String as PropType<string>,
  prefixIcon: String as PropType<string>,
  label: String as PropType<string>,
  clearable: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  showPassword: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  showWordLimit: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  tabindex: String as PropType<string>
}

export default defineComponent({
  name: 'EInput',
  props: inputProps,
  setup(props, context) {


    return () => h(Input, {
      props: pick(props, inputPropNames),
      on: {
        blur(event: FocusEvent) {
          context.emit('blur', event)
        },
        focus(event: FocusEvent) {
          context.emit('focus', event)
        },
        change(value: string | number) {
          context.emit('change', value)
        },
        input(value: string | number) {
          context.emit('input', value)
        },
        clear() {
          context.emit('clear')
        }
      }
    })
  }
})
