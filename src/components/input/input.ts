import { defineComponent, h, PropType, ref } from "vue"
import { Input } from "element-ui"
import { pick } from "../../utils";
import { customInputProps } from '../../shared/customInputProps'
import { useOnInput } from "../../shared/useOnInput";
import { ElInput } from "element-ui/types/input";
import { InputType } from '../../types/input'

const inputPropNames = ['value', 'size', 'resize', 'form', 'disabled', 'readonly', 'type', 'autosize', 'autocomplete',  'validateEvent', 'suffixIcon', 'prefixIcon', 'label', 'clearable', 'showPassword', 'showWordLimit', 'tabindex']
const inputAttrNames = ['placeholder', 'name', 'readonly', 'step', 'autofocus', 'form', 'rows', 'autosize', 'maxlength', 'minlength', 'max', 'min']

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
  inheritAttrs: false,
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
    
    return () => h(Input, {
      // @ts-ignore
      ref: (el: ElInput) => inputRef.value = el,
      props: pick(props, inputPropNames),
      attrs: pick(context.attrs, inputAttrNames),
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
    }, [
      context.slots?.suffix && h('slot', { slot: 'suffix' }, context.slots.suffix()),
      context.slots?.prefix && h('slot', { slot: 'prefix' }, context.slots.prefix()),
      context.slots?.prepend && h('slot', { slot: 'prepend' }, context.slots.prepend()),
      context.slots?.append && h('slot', { slot: 'append' }, context.slots.append())
    ])
  }
})
