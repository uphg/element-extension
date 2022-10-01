import { h, SetupContext } from "vue"
import { VNodeData } from "vue/types/umd";
import { Input } from "element-ui"
import { ElInput } from "element-ui/types/input";
import { InputProps, GlobalInputProps } from "./inputProps";
import { useOnInput } from "../../../composables/useOnInput";
import { useGlobalProps } from "../../../composables/useGlobalProps";
import { generateEmits } from "../../../utils/generateEmits";
import { renderSlots } from '../../../utils/renderSlot'
import { useElInput } from "../../../composables/useElInput";
import { ObjectLike } from "../../../../types/_common";
import { globalInputPropNames } from "../../../shared/configPropertyMap";
import { HandleRef } from "../../../composables/useComponentProps";
import { pick, withDefaultProps } from "../../../utils";

export interface UseInputOptins {
  status?: 0 | 1;
  handleRef?: HandleRef;
  on?: VNodeData['on'];
  handleProps?: (props: InputProps | ObjectLike, globalProps: GlobalInputProps | undefined, _options: { propNames: string[]; globalPropNames: string[] }) => () => ObjectLike;
  handleAttrs?: (props: InputProps | ObjectLike, globalProps: GlobalInputProps | undefined, _options: { attrNames: string[]; globalAttrNames: string[] }) => () => ObjectLike;
}

const _propNames = ['resize', 'form', 'disabled', 'readonly', 'type', 'autocomplete', 'validateEvent', 'label', 'showPassword', 'tabindex']
const attrNames = ['placeholder', 'name', 'step', 'autofocus', 'rows', 'minlength', 'max', 'min']
const globalAttrNames = ['maxlength']

const otherEmitNames = ['blur', 'focus', 'change', 'clear']
const slotNames = ['suffix', 'prefix', 'prepend', 'append']

export function useInputProps(
  props: InputProps | ObjectLike,
  context?: SetupContext<{}>,
  options?: UseInputOptins
) {
  const { handleProps, handleAttrs } = options || {}
  const globalInputProps = useGlobalProps<GlobalInputProps>('input')
  const propNames = options?.status === 1 ? _propNames : ['value', ..._propNames]

  const createProps = handleProps
    ? handleProps(props, globalInputProps, { propNames, globalPropNames: globalInputPropNames })
    : () => ({
        ...pick(props, propNames),
        ...withDefaultProps(props, globalInputProps, globalInputPropNames)
      })

  const createAttrs = handleAttrs
    ? handleAttrs(props, globalInputProps, { attrNames, globalAttrNames })
    : () => (context && {
      ...pick(context.attrs, attrNames),
      ...withDefaultProps(context.attrs, globalInputProps, globalAttrNames)
    })

  return {
    createProps,
    createAttrs,
    globalProps: globalInputProps
  }
}

export function useInput<T extends ObjectLike>(
  props: InputProps | T,
  context?: SetupContext<{}>,
  options?: UseInputOptins
) {
  const { elInput, focus, blur, select } = useElInput()
  const handleRef = (options?.handleRef || ((el: ElInput) => elInput.value = el)) as unknown as string

  const on = context ? {
    input: useOnInput(props, context),
    ...generateEmits(context.emit, otherEmitNames)
  } : options?.on

  const { createProps, createAttrs } = useInputProps(props, context, options)
  const expose = { focus, blur, select, get elInput() { return elInput.value } }

  return {
    expose,
    render() {
      const slots = context && renderSlots(context, slotNames)
      return h(Input, { ref: handleRef, props: createProps(), attrs: createAttrs(), on }, slots)
    }
  }
}