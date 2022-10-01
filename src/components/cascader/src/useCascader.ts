import { h, SetupContext } from "vue"
import { VNodeData } from "vue/types/umd"
import { Cascader } from "element-ui"
import { CascaderProps, GlobalCascaderProps } from "./cascaderProps"
import { useElCascader } from "../../../composables/useElCascader"
import { UseComponentParamsOptions, useComponentProps } from "../../../composables/useComponentProps"
import { generateEmits } from "../../../utils/generateEmits"
import { renderSlot } from "../../../utils/renderSlot"
import { ObjectLike } from "../../../../types/_common"
import { globalCascaderPropNames } from "../../../shared/configPropertyMap"
import { ElCalendar } from "../../../../types/_element-ui"

const _propNames = ['placeholder', 'disabled', 'filterable', 'filterMethod', 'debounce', 'beforeFilter']
const emitNames = ['change', 'expand-change', 'blur', 'focus', 'visible-change', 'remove-tag']

export function useCascader<T extends ObjectLike>(
  props: CascaderProps | T,
  context?: SetupContext<{}>,
  options?: UseComponentParamsOptions<CascaderProps | ObjectLike, GlobalCascaderProps>
) {
  const { handleProps, handleRef: _handleRef } = options || {}
  const { elCascader, getCheckedNodes } = useElCascader()
  const handleRef = (_handleRef || ((el: ElCalendar) => elCascader.value = el)) as unknown as string
  const propNames = options?.status === 1 ? _propNames : ['value', ..._propNames]
  const { createProps } = useComponentProps(props, 'cascader', { propNames, globalPropNames: globalCascaderPropNames, handleProps })
  const on = context?.emit ? generateEmits(context.emit, emitNames) : options?.on

  return {
    expose: {
      getCheckedNodes,
      get elCascader() {
        return elCascader.value
      }
    },
    render() {
      const scopedSlots: VNodeData['scopedSlots'] | undefined = context?.slots && {
        default: (params) => context.slots.default?.(params)
      }
      const slots = context?.slots && [renderSlot(context, 'empty')]

      return h(Cascader, {
        ref: handleRef,
        props: createProps(),
        on,
        scopedSlots: scopedSlots
      }, slots)
    }
  }
}