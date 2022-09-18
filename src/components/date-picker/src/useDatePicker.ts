import { h, ref, SetupContext } from "vue"
import { DatePicker as _DatePicker, TimeSelect, TimePicker } from "element-ui"
import { GlobalDateProps, PublicDateProps } from "./dateProps"
import { useComponentProps } from "../../../composables/useComponentProps"
import { configPropertyMap } from "src/shared/configPropertyMap"
import { ElDatePicker } from "element-ui/types/date-picker"
import { ElTimePicker } from "element-ui/types/time-picker"
import { ElTimeSelect } from "element-ui/types/time-select"
import { renderSlot } from "src/utils/renderSlot"

const publicPropNames = ['size', 'format', 'valueFormat', 'readonly', 'placeholder', 'startPlaceholder', 'endPlaceholder', 'prefixIcon', 'clearIcon', 'name', 'disabled', 'clearable', 'id', 'popperClass', 'editable', 'align', 'value', 'defaultValue', 'defaultTime', 'rangeSeparator', 'pickerOptions', 'unlinkPanels', 'validateEvent', 'isRange', 'arrowControl', 'timeArrowControl']
const globalPropNames = configPropertyMap.datePicker.propNames

type UseDatePickerOptions<Props extends PublicDateProps> = {
  type: 1 | 2 | 3 // 1: DatePicker; 2: TimePicker; 3: TimeSelect;
  handleProps?: HandleProps<Props, GlobalDateProps>
}

interface HandleProps<Props extends PublicDateProps, GlobalProps> {
  (props: Props, globalProps?: GlobalProps): () => Props
}

type DatePickerValue = Date | string | number | (string | number)[]

const componentMap = {
  1: ['datePicker', _DatePicker, 'elDatePicker'],
  2: ['timePicker', TimePicker, 'elTimePicker'],
  3: ['timeSelect', TimeSelect, 'elTimeSelect'],
} as {
  1: ['datePicker', typeof _DatePicker, 'elDatePicker'];
  2: ['timePicker', typeof TimePicker, 'elTimePicker'];
  3: ['timeSelect', typeof TimeSelect, 'elTimeSelect'];
}

export function useDatePicker<Props extends PublicDateProps>(
  props: Props,
  context: SetupContext<{}>,
  options: UseDatePickerOptions<Props>
) {
  const { handleProps } = options || {} 
  const DatePicker = componentMap[options.type][1]
  const elDatePicker = ref<ElDatePicker | ElTimePicker | ElTimeSelect | null>(null)
  const propNames = [...(options.type === 1 ? ['type', 'timeArrowControl'] : (options.type === 3 ? ['type'] : [])), ...publicPropNames, ]
  const { createProps } = useComponentProps(props, componentMap[options.type][0], { propNames, globalPropNames, handleProps })
  const on = {
    input(value: DatePickerValue) {
      context.emit('input', value)
    },
    change(value: DatePickerValue) {
      context.emit('change', value)
    },
    blur(event: MouseEvent) {
      context.emit('blur', event)
    },
    focus(event: FocusEvent) {
      context.emit('focus', event)
    }
  }

  const setRef = ((el: ElDatePicker | ElTimePicker | ElTimeSelect) => elDatePicker.value = el) as unknown as string

  return {
    expose: {
      focus() {
        elDatePicker.value
      },
      get [componentMap[options.type][2]]() {
        return elDatePicker.value
      }
    },
    render() {
      return h(DatePicker!, { ref: setRef, props: createProps(), on }, [
        renderSlot(context, 'range-separator')
      ])
    }
  }
}