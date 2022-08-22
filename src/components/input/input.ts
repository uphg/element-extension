import { defineComponent, h, PropType, ref } from "vue"
import { Input } from "element-ui"
import { pick } from "../../utils";
import { commonProps } from '../../shared/_commonProps'
import { useOnInput } from "../../composables/useOnInput";
import { ElInput } from "element-ui/types/input";
import { InputType } from '../../types/input'

const inputPropNames = ['value', 'size', 'resize', 'form', 'disabled', 'readonly', 'type', 'autosize', 'autocomplete',  'validateEvent', 'suffixIcon', 'prefixIcon', 'label', 'clearable', 'showPassword', 'showWordLimit', 'tabindex']
const inputAttrNames = ['placeholder', 'name', 'readonly', 'step', 'autofocus', 'form', 'rows', 'autosize', 'maxlength', 'minlength', 'max', 'min']

const inputProps = {
  value: [String, Number] as PropType<string | number>,
  type: {
    type: String as PropType<InputType>,
    default: 'text'
  },
  size: commonProps.size,
  resize: commonProps.resize,
  form: commonProps.form,
  disabled: commonProps.disabled,
  readonly: commonProps.readonly,
  autosize: commonProps.autosize,
  autocomplete: commonProps.autocomplete,
  validateEvent: commonProps.validateEvent,
  suffixIcon: commonProps.suffixIcon,
  prefixIcon: commonProps.prefixIcon,
  label: String as PropType<string>,
  clearable: commonProps.clearable,
  showPassword: commonProps.showPassword,
  showWordLimit: commonProps.showWordLimit,
  tabindex: commonProps.tabindex,
  exclude: commonProps.exclude,
}

export default defineComponent({
  name: 'EInput',
  props: inputProps,
  inheritAttrs: false,
  setup(props, context) {
    const elInput = ref<ElInput | null>(null)
    const onInput = useOnInput(props, context)

    context.expose({
      focus() {
        elInput.value?.focus()
      },
      blur() {
        elInput.value?.blur()
      },
      select() {
        elInput.value?.select()
      },

      get elInput() {
        return elInput.value
      }
    })
    
    return () => h(Input, {
      // @ts-ignore
      ref: (el: ElInput) => elInput.value = el,
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
