import { h, SetupContext } from "vue"
import { Input } from "element-ui"
import { InputProps, GlobalInputProps } from "./inputProps";
import { useOnInput } from "../../../composables/useOnInput";
import { useGlobalProps } from "../../../composables/useGlobalProps";
import { withDefaultProps } from "../../../utils/withDefaultProps";
import { generateEmits } from "../../../utils/generateEmits";
import { renderSlots } from '../../../utils/renderSlot'
import { useElInput } from "../../../composables/useElInput";
import { ObjectLike } from "../../../types/object-like";
import { globalInputPropNames } from "../../../shared/configPropertyMap";
import pick from "../../../utils/pick";

export interface UseInputOptins {
  handleProps: (props: InputProps | ObjectLike, globalProps?: GlobalInputProps) => () => ObjectLike
  handleAttrs: (props: InputProps | ObjectLike, globalProps?: GlobalInputProps) => () => ObjectLike
}

const _propNames = ['value', 'resize', 'form', 'disabled', 'readonly', 'type', 'autocomplete', 'validateEvent', 'label', 'showPassword', 'tabindex']
const _attrNames = ['placeholder', 'name', 'step', 'autofocus', 'rows', 'minlength', 'max', 'min']
const globalAttrNames = ['maxlength']

const otherEmitNames = ['blur', 'focus', 'change', 'clear']
const slotNames = ['suffix', 'prefix', 'prepend', 'append']

export function useInputProps(props: InputProps | ObjectLike, context: SetupContext<{}>, options?: UseInputOptins) {
  const { handleProps, handleAttrs } = options || {}
  const globalInputProps = useGlobalProps<GlobalInputProps>('input')
  const propNames = globalInputProps ? _propNames : [..._propNames, ...globalInputPropNames]
  const attrNames = globalInputProps ? _attrNames : [..._attrNames, ...globalAttrNames]

  const createProps = handleProps
    ? handleProps(props, globalInputProps)
    : () => ({
        ...pick(props, propNames),
        ...withDefaultProps(props, globalInputProps, globalInputPropNames)
      })

  const createAttrs = handleAttrs
    ? handleAttrs(props, globalInputProps)
    : () => ({
        ...pick(context.attrs, attrNames),
        ...withDefaultProps(context.attrs, globalInputProps, globalAttrNames)
      })

  return {
    createProps,
    createAttrs,
    globalProps: globalInputProps
  }
}

export function useInput<T extends ObjectLike>(props: InputProps | T, context: SetupContext<{}>, options?: UseInputOptins) {
  const { elInput, setRef, focus, blur, select } = useElInput()

  const input = useOnInput(props, context)
  const otherOn = generateEmits(context.emit, otherEmitNames)
  const on = { input, ...otherOn }

  const { createProps, createAttrs } = useInputProps(props, context, options)

  const expose = { focus, blur, select, get elInput() { return elInput.value } }

  return {
    expose,
    render: () => h(Input, { ref: setRef, props: createProps(), attrs: createAttrs(), on },
      renderSlots(context, slotNames)
    )
  }
}