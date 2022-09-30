import { h, SetupContext } from "vue"
import { Select } from "element-ui"
import { ElSelect } from "element-ui/types/select"
import { SelectProps, GlobalSelectProps } from "./selectProps"
import { renderSelectOptions } from '../../../utils/renderSelectOptions'
import { generateEmits } from "../../../utils/generateEmits"
import { renderSlot } from '../../../utils/renderSlot'
import { useElSelect } from "../../../composables/useElSelect"
import { UseComponentParamsOptions, useComponentProps } from "../../../composables/useComponentProps"
import { globalSelectPropNames } from "../../../shared/configPropertyMap"
import { ObjectLike } from "../../../../types/_common"

const _propNames = ['name', 'id', 'disabled', 'autocomplete', 'automaticDropdown',  'filterable', 'allowCreate', 'loading', 'remote', 'loadingText', 'noMatchText', 'noDataText', 'remoteMethod', 'filterMethod', 'placeholder', 'defaultFirstOption', 'reserveKeyword', 'collapseTags']
const emitNames = ['input', 'change', 'visibleChange', 'blur', 'clear']

export function useSelect<T extends ObjectLike>(
  props: SelectProps | T,
  context?: SetupContext<{}>,
  options?: UseComponentParamsOptions<SelectProps | ObjectLike, GlobalSelectProps>
) {
  const { handleProps } = options || {}
  const { elSelect, focus, blur } = useElSelect()
  const setRef = (options?.setRef || ((el: ElSelect) => elSelect.value = el)) as unknown as string
  const on = context ? generateEmits(context.emit, emitNames) : options?.on
  const propNames = options?.status === 1 ? _propNames : ['value', ..._propNames]
  const { createProps } = useComponentProps(props, 'select', { propNames, globalPropNames: globalSelectPropNames, handleProps })

  return {
    expose: { focus, blur, get elSelect() { return elSelect } },
    render() {
      const namedSlots = context && [
        renderSlot(context, 'prefix'),
        renderSlot(context, 'empty'),
      ]
      return h(Select, { ref: setRef, props: createProps(), on }, [namedSlots, ...renderSelectOptions(props, context)!])
    }
  }
}