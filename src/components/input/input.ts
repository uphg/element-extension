import { defineComponent, h } from "vue"
import { Input } from "element-ui"

const inputProps = {
  value: [String, Number],
  size: String,
  resize: String,
  form: String,
  disabled: Boolean,
  readonly: Boolean,
  type: String,
  autosize: [Boolean, Object],
  autocomplete: String,
  autoComplete: String,
  validateEvent: Boolean,
  suffixIcon: String,
  prefixIcon: String,
  label: String,
  clearable: Boolean,
  showPassword: Boolean,
  showWordLimit: Boolean,
  tabindex: String
}

export default defineComponent({
  name: 'EInput',
  props: inputProps,
  setup(props, context) {
    return () => h(Input, {
      props: {
        value: props.value,
        size: props.size,
        resize: props.resize,
        form: props.form,
        disabled: props.disabled,
        readonly: props.readonly,
        type: props.type,
        autosize: props.autosize,
        autocomplete: props.autocomplete,
        autoComplete: props.autoComplete,
        validateEvent: props.validateEvent,
        suffixIcon: props.suffixIcon,
        prefixIcon: props.prefixIcon,
        label: props.label,
        clearable: props.clearable,
        showPassword: props.showPassword,
        showWordLimit: props.showWordLimit,
        tabindex: props.tabindex
      },
      on: {
        blur(event: Event) {
          context.emit('blur', event)
        },
        focus(event: Event) {
          context.emit('focus', event)
        },
        change(value: string | number) {
          context.emit('change', value)
        },
        input(value: string | number) {
          context.emit('input', value)
        },
        clear() {
          context.emit('clear', event)
        }
      }
    })
  }
})
