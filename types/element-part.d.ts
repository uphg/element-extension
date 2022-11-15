import { EButton } from './button'
import { ERadioGroup } from './radio'
import { ECheckboxGroup } from './checkbox'
import { EInput } from './input'
import { EInputNumber } from './input-number'
import { ESelect } from './select'
import { ECascader } from './cascader'
import { ESwitch } from './switch'
import { ESlider } from './slider'
import { EDatePicker } from './date-picker'
import { ETimePicker } from './time-picker'
import { ETimeSelect } from './time-select'
import { EUpload } from './upload'
import { EForm } from './form'
import { EFormItem } from './form-item'
import { EFormulate } from './formulate'
import { ETable } from './table'
import { ETableColumn } from './table-column'
import { EPagination } from './pagination'
import { EStaggeredTransitionGroup } from './staggered-transition-group'
import { EConfigProvider } from './config-provider'
import { ELink } from './link'
import { ETag } from './tag'

export class Button extends EButton {}
export class RadioGroup extends ERadioGroup {}
export class CheckboxGroup extends ECheckboxGroup {}
export class Input extends EInput {}
export class InputNumber extends EInputNumber {}
export class Select extends ESelect {}
export class Cascader extends ECascader {}
export class Switch extends ESwitch {}
export class Slider extends ESlider {}
export class DatePicker extends EDatePicker {}
export class TimePicker extends ETimePicker {}
export class TimeSelect extends ETimeSelect {}
export class Upload extends EUpload {}
export class Form extends EForm {}
export class FormItem extends EFormItem {}
export class Formulate extends EFormulate {}
export class Table extends ETable {}
export class TableColumn extends ETableColumn {}
export class Pagination extends EPagination {}
export class StaggeredTransitionGroup extends EStaggeredTransitionGroup {}
export class Link extends ELink {}
export class Tag extends ETag {}
export class ConfigProvider extends EConfigProvider {}

export { EButton, useButton, buttonProps } from '../src/components/button'
export { ERadioGroup, useRadioGroup, radioGroupProps } from '../src/components/radio-group'
export { ECheckboxGroup, useCheckboxGroup, checkboxGroupProps } from '../src/components/checkbox-group'
export { EInput, useInput, inputProps } from '../src/components/input'
export { EInputNumber, useInputNumber, inputNumberProps } from '../src/components/input-number'
export { ESelect, useSelect, selectProps } from '../src/components/select'
export { ECascader, useCascader, cascaderProps } from '../src/components/cascader'
export { ESwitch, useSwitch, switchProps } from '../src/components/switch'
export { ESlider, useSlider, sliderProps } from '../src/components/slider'
export { EDatePicker, useDatePicker, datePickerProps, timePickerProps, timeSelectProps } from '../src/components/date-picker'
export { EUpload, useUpload, uploadProps } from '../src/components/upload'
export { EForm, useForm, formProps } from '../src/components/form'
export { EFormItem, useFormItem, formItemProps } from '../src/components/form-item'
export { EFormulate, useFormulate, formulateProps } from '../src/components/formulate'
export { ETable, useTable, tableProps } from '../src/components/table'
export { ETableColumn, useTableColumn, tableColumnProps } from '../src/components/table-column'
export { EPagination, usePagination, paginationProps } from '../src/components/pagination'
export { EStaggeredTransitionGroup } from '../src/components/staggered-transition-group'
export { ELink, useLink, linkProps } from '../src/components/link'
export { ETag, useTag, tagProps } from '../src/components/tag'
export { EConfigProvider, useConfigProvider, configProviderProps } from '../src/components/config-provider'

// utils
export { renderSlot, renderSlots } from '../src/utils/renderSlot'
export { useGlobalProps } from '../src/composables/useGlobalProps'