import { h, SetupContext } from "vue";
import { Link } from "element-ui";
import { GlobalLinkProps, globalLinkProps, LinkProps, linkProps } from "./linkProps";
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
  const propNames = keys(linkProps)
  const { createProps } = useComponentProps(props, 'link', { propNames, globalPropNames, handleProps })
  const on = props.onClick ? { click: props.onClick } : context?.emit && { click(event: MouseEvent) { context.emit('click', event) } }

  return {
    render: () => h(Link, {
      ref: (handleRef as unknown as string),
      props: createProps(),
      on
    }, [_renderChildren ? _renderChildren() : context && renderSlots(context, slotNames)])
  }
}
