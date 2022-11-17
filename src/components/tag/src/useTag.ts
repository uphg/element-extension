import { h, SetupContext } from "vue";
import { Tag } from "element-ui";
import { globalTagProps, GlobalTagProps, TagProps } from "./tagProps";
import { keys } from "../../../utils";
import { ObjectLike } from "../../../../types/_common";
import { UseComponentParamsOptions, useComponentProps } from "../../../composables/useComponentProps";

export function useTag<T extends ObjectLike>(
  props: TagProps | T,
  context?: SetupContext<{}>,
  options?: UseComponentParamsOptions<TagProps | ObjectLike, GlobalTagProps>
) {

  const { handleProps, handleRef, renderChildren: _renderChildren } = options || {}
  const globalPropNames = keys(globalTagProps)
  const { createProps } = useComponentProps(props, 'tag', { propNames: [], globalPropNames, handleProps })
  const on = options?.on ? options.on : context?.emit && {
    click: props.onClick || ((event: MouseEvent) => { context.emit('click', event) }),
    close: props.onClose || ((event: MouseEvent) => { context.emit('close', event) })
  }

  const renderChildren = _renderChildren ? _renderChildren : context?.slots?.default

  return {
    render: () => h(Tag, {
      ref: (handleRef as unknown as string),
      props: createProps(),
      on
    }, [renderChildren?.()])
  }
}
