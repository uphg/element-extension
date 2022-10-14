import { h, ref, SetupContext } from "vue"
import { Button } from "element-ui"
import { buttonBaseProps, ButtonProps, GlobalButtonProps, globalButtonProps } from "./buttonProps"
import { UseComponentParamsOptions, useComponentProps } from "../../../composables/useComponentProps"
import { keys } from "../../../utils"
import { ObjectLike } from "../../../../types/_common"

export function useButton<T extends ObjectLike>(
  props: ButtonProps | T,
  context?: SetupContext<{}>,
  options?: UseComponentParamsOptions<ButtonProps | ObjectLike, GlobalButtonProps>
) {
  const { handleProps, handleRef, renderChildren: _renderChildren } = options || {}
  const globalPropNames = keys(globalButtonProps)
  const propNames = keys(buttonBaseProps)
  const { createProps } = useComponentProps(props, 'button', { propNames, globalPropNames, handleProps })
  const on = props.onClick ? { click: props.onClick } : context?.emit && { click(event: MouseEvent) { context.emit('click', event) } }
  const renderChildren = _renderChildren ? _renderChildren : (context?.slots?.default && (() => context.slots.default?.()))

  const render = () => h(Button, {
    ref: (handleRef as unknown as string),
    props: createProps(),
    on
  }, renderChildren && [renderChildren()])

  return {
    render
  }
}
