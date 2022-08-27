import { h, ref, SetupContext } from "vue"
import { Input } from "element-ui"
import { useOnInput } from "../../../composables/useOnInput";
import { ElInput } from "element-ui/types/input";
import { InputProps } from "./inputProps";
import { useGlobalProps } from "../../../composables/useGlobalProps";
import { GlobalInputProps } from "../../../components/config-provider/src/configProviderProps";
import { handleProps } from "../../../utils/handleProps";

export function useInput(props: InputProps, context: SetupContext<{}>) {
  const elInput = ref<ElInput | null>(null)
  const onInput = useOnInput(props, context)
  const globalInputProps = useGlobalProps<GlobalInputProps>('input')

  const setRef = function(el: ElInput) {
    elInput.value = el
  } as unknown as string

  return {
    expose: {
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
    },
    render: () => h(Input, {
      ref: setRef,
      props: {
        value: props.value,
        resize: props.resize,
        form: props.form,
        disabled: props.disabled,
        readonly: props.readonly,
        type: props.type,
        autocomplete: props.autocomplete,
        validateEvent: props.validateEvent,
        suffixIcon: props.suffixIcon,
        prefixIcon: props.prefixIcon,
        label: props.label,
        showPassword: props.showPassword,
        tabindex: props.tabindex,
        ...handleProps<GlobalInputProps>(props as GlobalInputProps, globalInputProps, ['clearable', 'showWordLimit', 'autosize','size'])
      },
      attrs: {
        placeholder: context.attrs.placeholder,
        name: context.attrs.name,
        readonly: context.attrs.readonly,
        step: context.attrs.step,
        autofocus: context.attrs.autofocus,
        form: context.attrs.form,
        rows: context.attrs.rows,
        minlength: context.attrs.minlength,
        max: context.attrs.max,
        min: context.attrs.min,
        ...handleProps<GlobalInputProps>(context.attrs as GlobalInputProps, globalInputProps, ['maxlength'])
      },
      on: {
        input: onInput,
        blur(event: FocusEvent) {
          context.emit('blur', event)
        },
        focus(event: FocusEvent) {
          context.emit('focus', event)
        },
        change(value: string | number) {
          context.emit('change', value)
        },
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
}