import { CascaderOption } from "element-ui/types/cascader-panel";
import { cascaderProps } from "src/components/cascader";
import { CheckboxGroupOptions, checkboxGroupProps } from "src/components/checkbox-group/src/checkboxGroupProps";
import { datePickerProps, dateProps, timePickerProps } from "src/components/date-picker/src/dateProps";
import { inputProps } from "src/components/input";
import { inputNumberProps } from "src/components/input-number";
import { RadioGroupOptions, radioGroupProps } from "src/components/radio-group/src/radioGroupProps";
import { SelectOptions, selectProps } from "src/components/select/src/selectProps";
import { sliderProps } from "src/components/slider";
import { switchProps } from "src/components/switch";
import { uploadProps } from "src/components/upload";
import { ExtractPropTypes, PropType } from "vue";
import { ObjectLike } from "../../../../types/_common";
import { commonProps, empty } from "../../../shared/_commonProps";

export type FormItemBaseProps = ExtractPropTypes<typeof formItemBaseProps>
export type FormItemExtendsProps = ExtractPropTypes<typeof formItemExtendsProps>
export type FormItemProps = ExtractPropTypes<typeof formItemProps>

const booleanProp = Boolean as PropType<boolean>
const stringProp = String as PropType<string>
const emptyStringProp = {
  type: stringProp,
  default: ''
}

export const formItemBaseProps = {
  type: {
    type: String as PropType<string>,
    default: 'text'
  },
  value: {
    type: [String, Number, Array, Boolean, Date] as PropType<string | number | Array<unknown> | boolean | Date>,
    default: ''
  },
  options: {
    type: [Array] as PropType<RadioGroupOptions | CheckboxGroupOptions | SelectOptions | CascaderOption[]>
  },
  clearable: commonProps.clearable,
  disabled: booleanProp,
  readonly: booleanProp,
  showPassword: booleanProp,
  showWordLimit: booleanProp,
  validateEvent: {
    type: booleanProp,
    default: empty
  },
  action: uploadProps.action,
  multiple: uploadProps.multiple,
  headers: uploadProps.headers,
  fileList: uploadProps.fileList,
  accept: uploadProps.accept,
  format: dateProps.format,
  pickerOptions: dateProps.pickerOptions,
  size: commonProps.size,

  // custom props
  exclude: inputProps.exclude,
  optionGroups: selectProps.optionGroups,
  withBorder: {
    type: booleanProp,
    default: empty
  },
  withButton: {
    type: booleanProp,
    default: empty
  }
}

export const formItemExtendsProps = {
  popperClass: commonProps.popperClass,
  debounce: commonProps.debounce,

  // --- Radio
  size: commonProps.size,
  textColor: radioGroupProps.textColor,
  fill: radioGroupProps.fill,

  // --- Checkout
  min: checkboxGroupProps.min,
  max: checkboxGroupProps.max,

  // --- Input
  tabindex: inputProps.tabindex,
  resize: inputProps.resize,
  form: inputProps.form,
  autocomplete: inputProps.autocomplete,
  autosize: inputProps.autosize,
  suffixIcon: inputProps.suffixIcon,
  prefixIcon: inputProps.prefixIcon,

  // --- InputNumber
  step: inputNumberProps.step,
  stepStrictly: inputNumberProps.stepStrictly,
  precision: inputNumberProps.precision,
  controls: inputNumberProps.controls,
  controlsPosition: inputNumberProps.controlsPosition,

  // --- Select
  id: selectProps.id,
  automaticDropdown: selectProps.automaticDropdown,
  filterable: selectProps.filterable,
  allowCreate: selectProps.allowCreate,
  loading: selectProps.loading,
  remote: selectProps.remote,
  loadingText: selectProps.loadingText,
  noMatchText: selectProps.noMatchText,
  noDataText: selectProps.noDataText,
  remoteMethod: selectProps.remoteMethod,
  filterMethod: selectProps.filterMethod,
  multipleLimit: selectProps.multipleLimit,
  defaultFirstOption: selectProps.defaultFirstOption,
  reserveKeyword: selectProps.reserveKeyword,
  valueKey: selectProps.valueKey,
  collapseTags: selectProps.collapseTags,
  popperAppendToBody: selectProps.popperAppendToBody,

  // --- Cascader
  props: cascaderProps.props,
  separator: cascaderProps.separator,
  showAllLevels: cascaderProps.showAllLevels,
  beforeFilter: cascaderProps.beforeFilter,
  // Cascader: PopperMixin
  placement: cascaderProps.placement,
  appendToBody: cascaderProps.appendToBody,
  visibleArrow: cascaderProps.visibleArrow,
  arrowOffset: cascaderProps.arrowOffset,
  offset: cascaderProps.offset,
  boundariesPadding: cascaderProps.boundariesPadding,
  popperOptions: cascaderProps.popperOptions,
  transformOrigin: cascaderProps.transformOrigin,

  // --- Date
  defaultValue: dateProps.defaultValue,
  defaultTime: dateProps.defaultTime,
  valueFormat: dateProps.valueFormat,
  startPlaceholder: dateProps.startPlaceholder,
  endPlaceholder: dateProps.endPlaceholder,
  clearIcon: dateProps.clearIcon,
  editable: dateProps.editable,
  align: dateProps.align,
  rangeSeparator: dateProps.rangeSeparator,
  unlinkPanels: dateProps.unlinkPanels,

  // --- DatePicker
  timeArrowControl: datePickerProps.timeArrowControl,

  // --- TimePicker
  isRange: timePickerProps.isRange,
  arrowControl: timePickerProps.arrowControl,

  // --- Switch
  width: switchProps.width,
  activeIconClass: switchProps.activeIconClass,
  inactiveIconClass: switchProps.inactiveIconClass,
  activeText: switchProps.activeText,
  inactiveText: switchProps.inactiveText,
  activeColor: switchProps.activeColor,
  inactiveColor: switchProps.inactiveColor,
  activeValue: switchProps.activeValue,
  inactiveValue: switchProps.inactiveValue,

  // --- Slider
  // value - default: 0
  // min - default: 0
  // max - default: 100
  // step - default: 1
  label: sliderProps.label,
  showInput: sliderProps.showInput,
  showInputControls: sliderProps.showInputControls,
  inputSize: sliderProps.inputSize,
  showStops: sliderProps.showStops,
  showTooltip: sliderProps.showTooltip,
  formatTooltip: sliderProps.formatTooltip,
  range: sliderProps.range,
  vertical: sliderProps.vertical,
  height: sliderProps.height,
  tooltipClass: sliderProps.tooltipClass,
  marks: sliderProps.marks,

  // --- Upload
  limit: uploadProps.limit,
  drag: uploadProps.drag,
  data: uploadProps.data,
  dragger: uploadProps.dragger,
  withCredentials: uploadProps.withCredentials,
  showFileList: uploadProps.showFileList,
  beforeUpload: uploadProps.beforeUpload,
  beforeRemove: uploadProps.beforeRemove,
  onRemove: uploadProps.onRemove,
  onChange: uploadProps.onChange,
  onPreview: uploadProps.onPreview,
  onSuccess: uploadProps.onSuccess,
  onProgress: uploadProps.onProgress,
  onError: uploadProps.onError,
  autoUpload: uploadProps.autoUpload,
  listType: uploadProps.listType,
  httpRequest: uploadProps.httpRequest,
  onExceed: uploadProps.onExceed,
  action: uploadProps.action,
  headers: uploadProps.headers,
  multiple: uploadProps.multiple,
}

export const elFormItemProps = {
  label: emptyStringProp,
  labelWidth: emptyStringProp,
  prop: stringProp,
  required: {
    type: booleanProp,
    default: empty
  },
  rules: [Object, Array] as PropType<ObjectLike | ObjectLike[]>,
  error: stringProp,
  validateStatus: stringProp,
  for: stringProp,
  inlineMessage: booleanProp,
  showMessage: {
    type: booleanProp,
    default: true
  },

  // ?...
  size: String as PropType<'medium' | 'small' | 'mini'>
}


export const formItemProps = {
  ...elFormItemProps,
  ...formItemBaseProps,
  extends: {
    type: Object as PropType<FormItemExtendsProps>,
    default: () => ({})
  }
}

