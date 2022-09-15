import { h, ref, SetupContext } from "vue"
import { Input } from "element-ui"
import { useOnInput } from "../../../composables/useOnInput";
import { ElInput } from "element-ui/types/input";
import { InputProps, GlobalInputProps } from "./inputProps";
import { useGlobalProps } from "../../../composables/useGlobalProps";
import { withDefaultProps } from "../../../utils/withDefaultProps";
import { generateEmits } from "../../../utils/generateEmits";
import pick from "../../../utils/pick";
import { renderSlots } from '../../../utils/renderSlot'
import { useElInput } from "../../../composables/useElInput";
import { ObjectLike } from "../../../types/object-like";

export interface UseInputOptins {
  handleProps: (props: InputProps, globalProps?: GlobalInputProps) => ObjectLike
  handleAttrs: (props: InputProps, globalProps?: GlobalInputProps) => ObjectLike
}

export interface handleProps<Props, GlobalProps> {
  (props: Props, globalProps?: GlobalProps): Props
}

const _propNames = ['value', 'resize', 'form', 'disabled', 'readonly', 'type', 'autocomplete', 'validateEvent', 'suffixIcon', 'prefixIcon', 'label', 'showPassword', 'tabindex']
const globalPropNames = ['clearable', 'showWordLimit', 'autosize','size']

const _attrNames = ['placeholder', 'name', 'readonly', 'step', 'autofocus', 'form', 'rows', 'minlength', 'max', 'min']
const globalAttrNames = ['maxlength']

const otherEmitNames = ['blur', 'focus', 'change', 'clear']
const slotNames = ['suffix', 'prefix', 'prepend', 'append']

export function useInputProps(props: InputProps, context: SetupContext<{}>, options: UseInputOptins) {
  const { handleProps, handleAttrs } = options
  const globalInputProps = useGlobalProps<GlobalInputProps>('input')
  const propNames = globalInputProps ? _propNames : [..._propNames, ...globalPropNames]
  const attrNames = globalInputProps ? _attrNames : [..._attrNames, ...globalAttrNames]

  const createProps = handleProps
    ? () => handleProps(props, globalInputProps)
    : globalInputProps
      ? () => ({
          ...pick(props, propNames),
          ...withDefaultProps(props, globalInputProps, globalPropNames)
        })
      : () => pick(props, propNames)

  const createAttrs = handleAttrs
    ? () => handleAttrs(props, globalInputProps)
    : globalInputProps
      ? () => ({
          ...pick(context.attrs, attrNames),
          ...withDefaultProps(context.attrs, globalInputProps, globalAttrNames)
        })
      : () => pick(context.attrs, attrNames)

  return {
    createProps,
    createAttrs,
    globalProps: globalInputProps
  }
}

export function useInput(props: InputProps, context: SetupContext<{}>, options: UseInputOptins) {
  const { elInput, focus, blur, select } = useElInput()

  const onInput = useOnInput(props, context)
  const otherOn = generateEmits(context.emit, otherEmitNames)
  const on = { input: onInput, ...otherOn }

  const { createProps, createAttrs } = useInputProps(props, context, options)

  const expose = { focus, blur, select, get elInput() { return elInput.value } }

  const setRef = function(el: ElInput) {
    elInput.value = el
  } as unknown as string

  return {
    expose,
    render() {
      return h(Input, { ref: setRef, props: createProps(), attrs: createAttrs(), on },
        renderSlots(context, slotNames)
      )
    }
  }
}