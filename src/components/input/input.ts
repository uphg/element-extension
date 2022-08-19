import { defineComponent, h, PropType, ref } from "vue"
import { Input } from "element-ui"
import { pick } from "../../utils";
import { customInputProps } from '../../shared/customInputProps'
import { useOnInput } from "../../shared/useOnInput";
import { ElInput } from "element-ui/types/input";
import { InputType } from '../../types/input'

const inputPropNames = ['value', 'size', 'resize', 'form', 'disabled', 'readonly', 'type', 'autosize', 'autocomplete', 'autoComplete', 'validateEvent', 'suffixIcon', 'prefixIcon', 'label', 'clearable', 'showPassword', 'showWordLimit', 'tabindex']

const inputProps = {
  value: [String, Number] as PropType<string | number>,
  size: customInputProps.size,
  resize: customInputProps.resize,
  form: customInputProps.form,
  disabled: customInputProps.disabled,
  readonly: customInputProps.readonly,
  type: {
    type: String as PropType<InputType>,
    default: 'text'
  },
  autosize: customInputProps.autosize,
  autocomplete: customInputProps.autocomplete,
  validateEvent: customInputProps.validateEvent,
  suffixIcon: customInputProps.suffixIcon,
  prefixIcon: customInputProps.prefixIcon,
  label: String as PropType<string>,
  clearable: customInputProps.clearable,
  showPassword: customInputProps.showPassword,
  showWordLimit: customInputProps.showWordLimit,
  tabindex: customInputProps.tabindex,
  exclude: customInputProps.exclude,
}

export default defineComponent({
  name: 'EInput',
  props: inputProps,
  setup(props, context) {
    const inputRef = ref<ElInput | null>(null)
    const onInput = useOnInput(props, context)

    context.expose({
      focus() {
        inputRef.value?.focus()
      },
      blur() {
        inputRef.value?.blur()
      },
      select() {
        inputRef.value?.select()
      }
    })
    // @ts-ignore
    return () => h(Input, {
      ref: (el: ElInput) => inputRef.value = el,
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
        input: onInput,
        clear() {
          context.emit('clear')
        }
      }
    })
  }
})
