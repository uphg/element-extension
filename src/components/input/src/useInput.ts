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

const _propNames = ['value', 'resize', 'form', 'disabled', 'readonly', 'type', 'autocomplete', 'validateEvent', 'suffixIcon', 'prefixIcon', 'label', 'showPassword', 'tabindex']
const globalPropNames = ['clearable', 'showWordLimit', 'autosize','size']

const _attrNames = ['placeholder', 'name', 'readonly', 'step', 'autofocus', 'form', 'rows', 'minlength', 'max', 'min']
const globalAttrNames = ['maxlength']

const otherEmitNames = ['blur', 'focus', 'change', 'clear']
const slotNames = ['suffix', 'prefix', 'prepend', 'append']

export function useInput(props: InputProps, context: SetupContext<{}>) {
  const elInput = ref<ElInput | null>(null)
  const onInput = useOnInput(props, context)
  const otherOn = generateEmits(context.emit, otherEmitNames)
  const on = { input: onInput, ...otherOn }

  const globalInputProps = useGlobalProps<GlobalInputProps>('input')
  const propNames = globalInputProps ? _propNames : [..._propNames, ...globalPropNames]
  const attrNames = globalInputProps ? _attrNames : [..._attrNames, ...globalAttrNames]

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
    render: () => {
      const pickProps = pick(props, propNames)
      const pickAttrs = pick(context.attrs, attrNames)
      return h(Input, {
        ref: setRef,
        props: globalInputProps ? {
          ...pickProps,
          ...withDefaultProps(props, globalInputProps, globalPropNames)
        } : pickProps,
        attrs: globalInputProps ? {
          ...pickAttrs,
          ...withDefaultProps(context.attrs, globalInputProps, globalAttrNames)
        } : pickAttrs,
        on,
      }, renderSlots(context, slotNames))
    }
  }
}