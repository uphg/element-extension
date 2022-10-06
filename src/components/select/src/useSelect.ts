import { h, SetupContext } from "vue"
import { Select } from "element-ui"
import { ElSelect } from "element-ui/types/select"
import { SelectProps, GlobalSelectProps, selectBaseProps, globalSelectProps } from "./selectProps"
import { renderSelectOptions } from './renderSelectOptions'
import { createNames, generateEmits, keys, renderSlot } from "../../../utils"
import { useElSelect } from "../../../composables/useElSelect"
import { UseComponentParamsOptions, useComponentProps } from "../../../composables/useComponentProps"
import { ObjectLike } from "../../../../types/_common"

const emitNames = ['input', 'change', 'visibleChange', 'blur', 'clear']

export function useSelect<T extends ObjectLike>(
  props: SelectProps | T,
  context?: SetupContext<{}>,
  options?: UseComponentParamsOptions<SelectProps | ObjectLike, GlobalSelectProps>
) {
  const { handleProps, handleRef: _handleRef } = options || {}
  const { elSelect, focus, blur } = useElSelect()
  const handleRef = (_handleRef || ((el: ElSelect) => elSelect.value = el)) as unknown as string
  const on = context?.emit ? generateEmits(context.emit, emitNames) : options?.on
  const propNames = createNames(selectBaseProps, options?.status)
  const globalPropNames = keys(globalSelectProps)
  const { createProps } = useComponentProps(props, 'select', { propNames, globalPropNames, handleProps })

  return {
    expose: { focus, blur, get elSelect() { return elSelect } },
    render() {
      const namedSlots = context?.slots && [
        renderSlot(context, 'prefix'),
        renderSlot(context, 'empty'),
      ]
      return h(Select, { ref: handleRef, props: createProps(), on }, [namedSlots, ...renderSelectOptions(props, context)!])
    }
  }
}