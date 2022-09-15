import { ElSelect } from "element-ui/types/select"
import { h, ref, SetupContext } from "vue"
import { Select } from "element-ui"
import { SelectProps } from "./selectProps"
import { renderSelectOptions } from '../../../utils/renderSelectOptions'
import pick from "../../../utils/pick"
import { generateEmits } from "../../../utils/generateEmits"
import { renderSlot } from '../../../utils/renderSlot'
import { useElSelect } from "../../../composables/useElSelect"

const propNames = ['name', 'id', 'value', 'disabled', 'autocomplete', 'automaticDropdown',  'filterable', 'allowCreate', 'loading', 'remote', 'loadingText', 'noMatchText', 'noDataText', 'remoteMethod', 'filterMethod', 'placeholder', 'defaultFirstOption', 'reserveKeyword', 'collapseTags']
const globalPropNames = ['valueKey', 'size', 'multiple', 'multipleLimit', 'clearable', 'popperClass', 'popperAppendToBody']
const emitNames = ['input', 'change', 'visibleChange', 'blur', 'clear']

export function useSelect(props: SelectProps, context: SetupContext<{}>) {
  const { elSelect, focus, blur } = useElSelect()
  const expose = { focus, blur, get elSelect() { return elSelect } }
  const setRef = ((el: ElSelect) => elSelect.value = el) as unknown as string

  const on = generateEmits(context.emit, emitNames)

  return {
    expose,
    render: () => h(Select, { ref: setRef, props: pick(props, propNames), on }, [
      renderSlot(context, 'prefix'),
      renderSlot(context, 'empty'),
      ...renderSelectOptions(props, context)!,
    ])
  }
}