import { h, ref, SetupContext } from "vue"
import { DatePicker as _DatePicker, TimeSelect, TimePicker } from "element-ui"
import { GlobalDateProps, PublicDateProps } from "./dateProps"
import { useComponentProps } from "../../../composables/useComponentProps"
import { globalDatePropNames } from "../../../shared/configPropertyMap"
import { renderSlot } from "../../../utils/renderSlot"
import { ObjectLike } from "../../../types/object-like"
import { ElDatePicker } from "element-ui/types/date-picker"
import { ElTimePicker } from "element-ui/types/time-picker"
import { ElTimeSelect } from "element-ui/types/time-select"

const publicPropNames = ['value', 'readonly', 'name', 'id', 'disabled', 'isRange', 'arrowControl', 'timeArrowControl']

type UseDatePickerOptions<Props> = {
  type: 1 | 2 | 3 // 1: DatePicker; 2: TimePicker; 3: TimeSelect;
  handleProps?: (props: Props, globalProps?: GlobalDateProps) => () => Props
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

export function useDatePicker<T extends ObjectLike>(
  props: PublicDateProps | T,
  context: SetupContext<{}>,
  options: UseDatePickerOptions<T | ObjectLike>
) {
  const { handleProps } = options || {} 
  const DatePicker = componentMap[options.type][1]
  const elDatePicker = ref<ElDatePicker | ElTimePicker | ElTimeSelect | null>(null)
  const propNames = [...(options.type === 1 ? ['type', 'timeArrowControl'] : (options.type === 3 ? ['type'] : [])), ...publicPropNames, ]
  const { createProps } = useComponentProps(props, componentMap[options.type][0], { propNames, globalPropNames: globalDatePropNames, handleProps })
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