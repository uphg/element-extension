import { h, ref, SetupContext } from "vue"
import { Input } from "element-ui"
import { useOnInput } from "../../../composables/useOnInput";
import { ElInput } from "element-ui/types/input";
import { InputProps } from "./inputProps";
import { useGlobalProps } from "../../../composables/useGlobalProps";
import { GlobalInputProps } from "../../../components/config-provider/src/configProviderProps";
import { withDefaultProps } from "../../../utils/withDefaultProps";
import { generateEmits } from "../../../utils/generateEmits";
import pick from "../../../utils/pick";
import { renderSlots } from '../../../utils/renderSlot'

const propNames = ['value', 'resize', 'form', 'disabled', 'readonly', 'type', 'autocomplete', 'validateEvent', 'suffixIcon', 'prefixIcon', 'label', 'showPassword', 'tabindex']
const attrNames = ['placeholder', 'name', 'readonly', 'step', 'autofocus', 'form', 'rows', 'minlength', 'max', 'min']
const otherEmitNames = ['blur', 'focus', 'change', 'clear']
const globalPropNames = ['clearable', 'showWordLimit', 'autosize','size']
const globalAttrNames = ['maxlength']
const slotNames = ['suffix', 'prefix', 'prepend', 'append']

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
        ...pick(props, propNames),
        ...withDefaultProps(props, globalInputProps, globalPropNames)
      },
      attrs: {
        ...pick(context.attrs, attrNames),
        ...withDefaultProps(context.attrs, globalInputProps, globalAttrNames)
      },
      on
    }, renderSlots(context, slotNames))
  }
}