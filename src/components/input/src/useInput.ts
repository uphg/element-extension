import { h, ref, SetupContext } from "vue"
import { Input } from "element-ui"
import { useOnInput } from "../../../composables/useOnInput";
import { ElInput } from "element-ui/types/input";
import { InputProps } from "./inputProps";
import { useGlobalProps } from "../../../composables/useGlobalProps";
import { GlobalInputProps } from "../../../components/config-provider/src/configProviderProps";
import { handleDefaultProps } from "../../../utils/handleDefaultProps";
import { generateEmits } from "../../../utils/generateEmits";
import { generateProps } from "../../../utils/generateProps";

const propNames = ['value', 'resize', 'form', 'disabled', 'readonly', 'type', 'autocomplete', 'validateEvent', 'suffixIcon', 'prefixIcon', 'label', 'showPassword', 'tabindex']
const attrNames = ['placeholder', 'name', 'readonly', 'step', 'autofocus', 'form', 'rows', 'minlength', 'max', 'min']
const otherEmitNames = ['blur', 'focus', 'change', 'clear']
const globalPropNames = ['clearable', 'showWordLimit', 'autosize','size']
const globalAttrNames = ['maxlength']

export function useInput(props: InputProps, context: SetupContext<{}>) {
  const elInput = ref<ElInput | null>(null)
  const onInput = useOnInput(props, context)
  const otherOn = generateEmits(context.emit, otherEmitNames)
  const on = { input: onInput, ...otherOn }

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
        ...generateProps(props, propNames),
        ...handleDefaultProps<GlobalInputProps>(props as GlobalInputProps, globalInputProps, globalPropNames)
      },
      attrs: {
        ...generateProps(context.attrs, attrNames),
        ...handleDefaultProps<GlobalInputProps>(context.attrs as GlobalInputProps, globalInputProps, globalAttrNames)
      },
      on
    }, [
      context.slots?.suffix && h('slot', { slot: 'suffix' }, context.slots.suffix()),
      context.slots?.prefix && h('slot', { slot: 'prefix' }, context.slots.prefix()),
      context.slots?.prepend && h('slot', { slot: 'prepend' }, context.slots.prepend()),
      context.slots?.append && h('slot', { slot: 'append' }, context.slots.append())
    ])
  }
}