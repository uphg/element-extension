import { h, SetupContext } from "vue"
import { Cascader } from "element-ui"
import { CascaderProps, GlobalCascaderProps } from "./cascaderProps"
import { useElCascader } from "../../../composables/useElCascader"
import { UseComponentParamsOptions, useComponentProps } from "../../../composables/useComponentProps"
import { generateEmits } from "../../../utils/generateEmits"
import { renderSlot } from "../../../utils/renderSlot"

const propNames = ['value', 'placeholder', 'disabled', 'filterable', 'filterMethod', 'debounce', 'beforeFilter']
const globalPropNames = ['options', 'props', 'size', 'clearable', 'popperClass', 'separator', 'showAllLevels', 'collapseTags']

const emitNames = ['change', 'expand-change', 'blur', 'focus', 'visible-change', 'remove-tag']

export function useCascader(
  props: CascaderProps,
  context: SetupContext<{}>,
  options?: UseComponentParamsOptions<CascaderProps, GlobalCascaderProps>
) {
  const { handleProps } = options || {}
  const { elCascader, setRef, getCheckedNodes } = useElCascader()
  const { createProps } = useComponentProps(props, 'cascader', { propNames, globalPropNames, handleProps })
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