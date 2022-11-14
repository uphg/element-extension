import { h, SetupContext, VNodeChildren } from "vue"
import { VNode, VNodeData } from "vue/types/umd";
import { Input } from "element-ui"
import { ElInput } from "element-ui/types/input";
import { InputProps, GlobalInputProps, globalInputAttrs, inputBaseProps } from "./inputProps";
import { useOnInput } from "../../../composables/useOnInput";
import { useGlobalProps } from "../../../composables/useGlobalProps";
import { useElInput } from "../../../composables/useElInput";
import { ObjectLike } from "../../../../types/_common";
import { HandleRef } from "../../../composables/useComponentProps";
import { pick, withDefaultProps, generateEmits, renderSlots, keys, createNames } from "../../../utils";

export interface UseInputOptins {
  status?: 0 | 1;
  renderChildren?: () => VNodeChildren | VNode;
  on?: VNodeData['on'];
  handleRef?: HandleRef;
  handleProps?: (props: InputProps | ObjectLike, globalProps: GlobalInputProps | undefined, _options: { propNames: string[]; globalPropNames: string[] }) => () => ObjectLike;
  handleAttrs?: (props: InputProps | ObjectLike, globalProps: GlobalInputProps | undefined, _options: { attrNames: string[]; globalAttrNames: string[] }) => () => ObjectLike;
}

const attrNames = ['placeholder']

const otherEmitNames = ['blur', 'focus', 'change', 'clear']
const slotNames = ['suffix', 'prefix', 'prepend', 'append']

export function useInputProps(
  props: InputProps | ObjectLike,
  context?: SetupContext<{}>,
  options?: UseInputOptins
) {
  const { handleProps, handleAttrs } = options || {}
  const globalInputProps = useGlobalProps<GlobalInputProps>('input')
  const propNames = createNames(inputBaseProps, options?.status)
  const globalPropNames = keys(globalInputProps)
  const globalAttrNames = keys(globalInputAttrs)

  const createProps = handleProps
    ? handleProps(props, globalInputProps, { propNames, globalPropNames })
    : () => ({
        ...pick(props, propNames),
        ...withDefaultProps(props, globalInputProps, globalPropNames)
      })

  const createAttrs = handleAttrs
    ? handleAttrs(props, globalInputProps, { attrNames, globalAttrNames })
    : () => (context?.slots && {
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
  const { renderChildren: _renderChildren } = options || {}
  const { elInput, focus, blur, select } = useElInput()
  const handleRef = (options?.handleRef || ((el: ElInput) => elInput.value = el)) as unknown as string
  const { createProps, createAttrs } = useInputProps(props, context, options)

  const on = options?.on ? options.on : context?.emit ? {
    input: useOnInput(props, context),
    ...generateEmits(context.emit, otherEmitNames)
  } : {}

  const renderChildren = _renderChildren ? _renderChildren : context?.slots && (() => renderSlots(context, slotNames))

  const expose = { focus, blur, select, get elInput() { return elInput.value } }

  return {
    expose,
    render: () => h(Input, {
      ref: handleRef,
      props: createProps(),
      attrs: createAttrs(),
      on
    }, renderChildren && [renderChildren()])
  }
}