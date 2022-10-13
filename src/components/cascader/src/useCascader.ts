import { h, SetupContext } from "vue"
import { VNodeData } from "vue/types/umd"
import { Cascader } from "element-ui"
import { cascaderBaseProps, CascaderProps, globalCascaderProps, GlobalCascaderProps } from "./cascaderProps"
import { useElCascader } from "../../../composables/useElCascader"
import { UseComponentParamsOptions, useComponentProps } from "../../../composables/useComponentProps"
import { createNames, generateEmits, keys, renderSlot } from "../../../utils"
import { ObjectLike } from "../../../../types/_common"
import { ElCalendar } from "../../../../types/_element-ui"

const emitNames = ['change', 'expand-change', 'blur', 'focus', 'visible-change', 'remove-tag']

export function useCascader<T extends ObjectLike>(
  props: CascaderProps | T,
  context?: SetupContext<{}>,
  options?: UseComponentParamsOptions<CascaderProps | ObjectLike, GlobalCascaderProps>
) {
  const { handleProps, handleRef: _handleRef } = options || {}
  const { elCascader, getCheckedNodes } = useElCascader()
  const handleRef = (_handleRef || ((el: ElCalendar) => elCascader.value = el)) as unknown as string
  const propNames = createNames(cascaderBaseProps, options?.status)
  const globalPropNames = keys(globalCascaderProps)
  const { createProps } = useComponentProps(props, 'cascader', { propNames, globalPropNames, handleProps })
  const on = context?.emit ? generateEmits(context.emit, emitNames) : options?.on
  const scopedSlots: VNodeData['scopedSlots'] | undefined = context?.slots && {
    default: (params) => context.slots.default?.(params)
  }
  const renderChildren = context?.slots && (() => renderSlot(context, 'empty'))

  return {
    expose: {
      getCheckedNodes,
      get elCascader() {
        return elCascader.value
      }
    },
    render() {

      return h(Cascader, {
        ref: handleRef,
        props: createProps(),
        on,
        scopedSlots
      }, renderChildren && [renderChildren()])
    }
  }
}