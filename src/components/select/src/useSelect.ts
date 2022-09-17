import { h, SetupContext } from "vue"
import { Select } from "element-ui"
import { SelectProps, GlobalSelectProps } from "./selectProps"
import { renderSelectOptions } from '../../../utils/renderSelectOptions'
import { generateEmits } from "../../../utils/generateEmits"
import { renderSlot } from '../../../utils/renderSlot'
import { useElSelect } from "../../../composables/useElSelect"
import { UseComponentParamsOptions, useComponentProps } from "../../../composables/useComponentProps"

const propNames = ['name', 'id', 'value', 'disabled', 'autocomplete', 'automaticDropdown',  'filterable', 'allowCreate', 'loading', 'remote', 'loadingText', 'noMatchText', 'noDataText', 'remoteMethod', 'filterMethod', 'placeholder', 'defaultFirstOption', 'reserveKeyword', 'collapseTags']
const globalPropNames = ['valueKey', 'size', 'multiple', 'multipleLimit', 'clearable', 'popperClass', 'popperAppendToBody']
const emitNames = ['input', 'change', 'visibleChange', 'blur', 'clear']

export function useSelect(
  props: SelectProps,
  context: SetupContext<{}>,
  options?: UseComponentParamsOptions<SelectProps, GlobalSelectProps>
) {
  const { handleProps } = options || {}
  const { elSelect, setRef, focus, blur } = useElSelect()
  const { createProps } = useComponentProps(props, 'select', { propNames, globalPropNames, handleProps })

  const on = generateEmits(context.emit, emitNames)

  return {
    expose: { focus, blur, get elSelect() { return elSelect } },
    render: () => h(Select, { ref: setRef, props: createProps(), on }, [
      renderSlot(context, 'prefix'),
      renderSlot(context, 'empty'),
      ...renderSelectOptions(props, context)!,
    ])
  }
}