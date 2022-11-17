import { h, SetupContext } from "vue";
import { Link } from "element-ui";
import { GlobalLinkProps, globalLinkProps, linkBaseProps, LinkProps } from "./linkProps";
import { keys, renderSlots } from "../../../utils";
import { ObjectLike } from "../../../../types/_common";
import { UseComponentParamsOptions, useComponentProps } from "../../../composables/useComponentProps";

const slotNames = ['default', 'icon']

export function useLink<T extends ObjectLike>(
  props: LinkProps | T,
  context?: SetupContext<{}>,
  options?: UseComponentParamsOptions<LinkProps | ObjectLike, GlobalLinkProps>
) {

  const { handleProps, handleRef, renderChildren: _renderChildren } = options || {}
  const globalPropNames = keys(globalLinkProps)
  const propNames = keys(linkBaseProps)
  const { createProps } = useComponentProps(props, 'link', { propNames, globalPropNames, handleProps })
  const on = options?.on ? options.on : {
    click: props.onClick || context && ((event: MouseEvent) => { context.emit('click', event) })
  }
  const renderChildren = _renderChildren ? _renderChildren : context && (() => renderSlots(context, slotNames))

  return {
    render: () => h(Link, {
      ref: (handleRef as unknown as string),
      props: createProps(),
      on
    }, [renderChildren?.()])
  }
}
