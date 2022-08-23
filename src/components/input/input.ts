import { defineComponent, h, PropType, ref } from "vue"
import { Input } from "element-ui"
import { commonProps } from '../../shared/_commonProps'
import { useOnInput } from "../../composables/useOnInput";
import { ElInput } from "element-ui/types/input";
import { InputType } from '../../types/input'

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
        validateEvent: props.validateEvent,
        suffixIcon: props.suffixIcon,
        prefixIcon: props.prefixIcon,
        label: props.label,
        clearable: props.clearable,
        showPassword: props.showPassword,
        showWordLimit: props.showWordLimit,
        tabindex: props.tabindex
      },
      attrs: {
        placeholder: context.attrs.placeholder,
        name: context.attrs.name,
        readonly: context.attrs.readonly,
        step: context.attrs.step,
        autofocus: context.attrs.autofocus,
        form: context.attrs.form,
        rows: context.attrs.rows,
        autosize: context.attrs.autosize,
        maxlength: context.attrs.maxlength,
        minlength: context.attrs.minlength,
        max: context.attrs.max,
        min: context.attrs.min
      },
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
