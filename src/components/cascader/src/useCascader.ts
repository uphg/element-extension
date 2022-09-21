import { h, SetupContext } from "vue"
import { Cascader } from "element-ui"
import { CascaderProps, GlobalCascaderProps } from "./cascaderProps"
import { useElCascader } from "../../../composables/useElCascader"
import { UseComponentParamsOptions, useComponentProps } from "../../../composables/useComponentProps"
import { generateEmits } from "../../../utils/generateEmits"
import { renderSlot } from "../../../utils/renderSlot"
import { ObjectLike } from "../../../types/object-like"
import { globalCascaderPropNames } from "../../../shared/configPropertyMap"

const propNames = ['value', 'placeholder', 'disabled', 'filterable', 'filterMethod', 'debounce', 'beforeFilter']
const emitNames = ['change', 'expand-change', 'blur', 'focus', 'visible-change', 'remove-tag']

export function useCascader<T extends ObjectLike>(
  props: CascaderProps | T,
  context: SetupContext<{}>,
  options?: UseComponentParamsOptions<CascaderProps | ObjectLike, GlobalCascaderProps>
) {
  const { handleProps } = options || {}
  const { elCascader, setRef, getCheckedNodes } = useElCascader()
  const { createProps } = useComponentProps(props, 'cascader', {
    propNames,
    globalPropNames: globalCascaderPropNames,
    handleProps
  })
  const on = generateEmits(context.emit, emitNames)

  return {
    expose: {
      getCheckedNodes,
      get elCascader() {
        return elCascader.value
      }
    },
    render() {
      return h(Cascader, {
        ref: setRef,
        props: createProps(),
        on,
        scopedSlots: {
          default: (params) => context.slots.default?.(params)
        }
      }, [renderSlot(context, 'empty')])
    }
  }
}