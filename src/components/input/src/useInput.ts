import { h, ref, SetupContext } from "vue"
import { Input } from "element-ui"
import { useOnInput } from "../../../composables/useOnInput";
import { ElInput } from "element-ui/types/input";
import { InputProps } from "./inputProps";
import { useGlobalProps } from "../../../composables/useGlobalProps";
import { GlobalInputProps } from "../../../components/config-provider/src/configProviderProps";

export function useInput(props: InputProps, context: SetupContext<{}>) {
  const elInput = ref<ElInput | null>(null)
  const onInput = useOnInput(props, context)
  const globalInputProps = useGlobalProps<GlobalInputProps>('input')

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
      maxlength: context.attrs.maxlength || globalInputProps?.maxlength,
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