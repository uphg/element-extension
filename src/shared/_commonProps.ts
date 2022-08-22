import { ExtractPropTypes, PropType } from "vue";
import { CascaderOption } from "element-ui/types/cascader-panel";
import { DatePickerOptions } from "element-ui/types/date-picker";
import { TimePickerOptions } from "element-ui/types/time-picker";
import { TimeSelectOptions } from "element-ui/types/time-select";
import { ElUpload, FileListItem } from "element-ui/types/upload";
import { CustomInputOptions } from "../types/customInput";
import { InputExclude } from "../types/input";
import { QueryChangeHandler } from "element-ui/types/select";
import { FormRule, FormRules } from "src/types/form";


function noop() { }

export const commonProps = {
  type: {
    type: String as PropType<string>,
    default: 'text'
  },
  value: {
    type: [String, Number, Array, Boolean, Date] as PropType<string | number | Array<unknown> | boolean | Date>,
    default: ''
  },
  clearable: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  size: String as PropType<string>,
  disabled: Boolean as PropType<boolean>,
  showPassword: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  showWordLimit: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  validateEvent: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  options: [Array] as PropType<CustomInputOptions[] | CascaderOption[]>,
  multiple: Boolean as PropType<boolean>,

  pickerOptions: [Object] as PropType<DatePickerOptions | TimePickerOptions | TimeSelectOptions>,

  // html attrs
  id: String as PropType<string>,
  autocomplete: {
    type: String as PropType<string>,
    default: 'off'
  },
  resize: String as PropType<string>,
  tabindex: String as PropType<string>,
  placeholder: String as PropType<string>,
  name: String as PropType<string>,
  readonly: Boolean as PropType<boolean>,
  max: Number as PropType<number>,
  min: Number as PropType<number>,
  step: {
    type: Number as PropType<number>,
    default: 1 // input-number & slider
  },
  autofocus: String as PropType<string>,
  form: String as PropType<string>,
  rows: String as PropType<string>,
  autosize: {
    type: [Boolean, Object] as PropType<boolean | { [key: string]: any }>,
    default: false
  },
  maxlength: String as PropType<string>,
  minlength: String as PropType<string>,

  // ElForm
  label: String as PropType<string>,
  labelWidth: String as PropType<string>,
  prop: String as PropType<string>,
  required: {
    type: Boolean as PropType<boolean>,
    default: undefined
  },
  rules: [Object, Array] as PropType<FormRules | FormRule[]>,
  error: String as PropType<string>,
  validateStatus: String as PropType<string>,
  for: String as PropType<string>,

  model: Object as PropType<object>,
  labelPosition: String as PropType<string>,
  labelSuffix: {
    type: String as PropType<string>,
    default: ''
  },
  inline: Boolean as PropType<boolean>,
  inlineMessage: {
    type: [String, Boolean] as PropType<string | boolean>,
    default: ''
  },
  statusIcon: Boolean as PropType<boolean>,
  showMessage: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  validateOnRuleChange: {
    type: Boolean as PropType<boolean>,
    default: true // el 默认 true
  },
  hideRequiredAsterisk: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  popperClass: String as PropType<string>,
  debounce: {
    type: Number as PropType<number>,
    default: 300
  },
  suffixIcon: String as PropType<string>,
  prefixIcon: String as PropType<string>,
  stepStrictly: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  precision: {
    type: Number as PropType<number>,
    validator(val: number | string) {
      return val >= 0 && val === parseInt(val as string, 10);
    }
  },
  controls: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  controlsPosition: {
    type: String as PropType<string>,
    default: ''
  },
  automaticDropdown: Boolean as PropType<boolean>,
  filterable: Boolean as PropType<boolean>,
  allowCreate: Boolean as PropType<boolean>,
  loading: Boolean as PropType<boolean>,
  remote: Boolean as PropType<boolean>,
  loadingText: String as PropType<string>,
  noMatchText: String as PropType<string>,
  noDataText: String as PropType<string>,
  remoteMethod: Function as PropType<QueryChangeHandler>,
  filterMethod: Function as PropType<QueryChangeHandler>,
  multipleLimit: {
    type: Number as PropType<number>,
    default: 0
  },
  defaultFirstOption: Boolean as PropType<boolean>,
  reserveKeyword: Boolean as PropType<boolean>,
  valueKey: {
    type: String as PropType<string>,
    default: 'value'
  },
  collapseTags: Boolean as PropType<boolean>,
  popperAppendToBody: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  props: Object as PropType<object>,
  separator: {
    type: String,
    default: ' / '
  },
  showAllLevels: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  beforeFilter: {
    type: Function,
    default: () => (() => {})
  },

  placement: {
    type: String,
    default: 'bottom-start'
  },
  appendToBody: {
    type: Boolean,
    default: true
  },
  visibleArrow: {
    type: Boolean,
    default: true
  },
  arrowOffset: {
    type: Number,
    default: 35
  },
  offset: {
    default: 0
  },
  boundariesPadding: {
    type: Number,
    default: 5
  },
  popperOptions: {
    type: Object,
    default() {
      return {
        gpuAcceleration: false
      };
    }
  },
  transformOrigin: {
    type: [Boolean, String],
    default: true
  },

  // date
  format: String as PropType<string>,
  valueFormat: String as PropType<string>,
  startPlaceholder: String as PropType<string>,
  endPlaceholder: String as PropType<string>,
  clearIcon: {
    type: String as PropType<string>,
    default: 'el-icon-circle-close'
  },
  editable: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  align: {
    type: String as PropType<string>,
    default: 'left'
  },
  defaultValue: {} as PropType<{ [key: string]: any }>,
  defaultTime: {} as PropType<{ [key: string]: any }>,
  rangeSeparator: {
    type: [String, Number] as PropType<string | number>,
    default: '-'
  },
  unlinkPanels: Boolean as PropType<boolean>,

  // DatePicker
  timeArrowControl: Boolean as PropType<boolean>,

  // TimePicker
  isRange: Boolean as PropType<boolean>,
  arrowControl: Boolean as PropType<boolean>,

  // switch
  width: {
    type: Number as PropType<number>,
    default: 40
  },
  activeIconClass: {
    type: String as PropType<string>,
    default: ''
  },
  inactiveIconClass: {
    type: String as PropType<string>,
    default: ''
  },
  activeText: String as PropType<string>,
  inactiveText: String as PropType<string>,
  activeColor: {
    type: String as PropType<string>,
    default: ''
  },
  inactiveColor: {
    type: String as PropType<string>,
    default: ''
  },
  activeValue: {
    type: [Boolean, String, Number] as PropType<boolean | string | number>,
    default: true
  },
  inactiveValue: {
    type: [Boolean, String, Number] as PropType<boolean | string | number>,
    default: false
  },

  // upload
  action: {
    type: String as PropType<string>,
  },
  headers: {
    type: Object as PropType<object>,
    default() {
      return {};
    }
  },
  data: Object as PropType<object>,
  drag: Boolean as PropType<boolean>,
  dragger: Boolean as PropType<boolean>,
  withCredentials: Boolean as PropType<boolean>,
  showFileList: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  accept: String as PropType<string>,
  beforeUpload: Function as PropType<ElUpload['beforeUpload']>,
  beforeRemove: Function as PropType<ElUpload['onExceed']>,
  onRemove: {
    type: Function as PropType<ElUpload['onRemove']>,
    default: noop
  },
  onChange: {
    type: Function as PropType<ElUpload['onChange']>,
    default: noop
  },
  onPreview: {
    type: Function as PropType<ElUpload['onPreview']>,
  },
  onSuccess: {
    type: Function as PropType<ElUpload['onSuccess']>,
    default: noop
  },
  onProgress: {
    type: Function as PropType<ElUpload['onProgress']>,
    default: noop
  },
  onError: {
    type: Function as PropType<ElUpload['onError']>,
    default: noop
  },
  fileList: {
    type: Array as PropType<FileListItem[]>,
    default() {
      return [];
    }
  },
  autoUpload: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  listType: {
    type: String as PropType<string>,
    default: 'text' // text,picture,picture-card
  },
  httpRequest: Function as PropType<ElUpload["httpRequest"]>,
  limit: Number as PropType<number>,
  onExceed: {
    type: Function as PropType<ElUpload['onExceed']>,
    default: noop
  },

  // slider
  // value - default: 0
  // min - default: 0
  // max - default: 100
  // step - default: 1
  showInput: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  showInputControls: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  inputSize: {
    type: String as PropType<string>,
    default: 'small'
  },
  showStops: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  showTooltip: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  formatTooltip: Function as PropType<Function>,
  range: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  vertical: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  height: {
    type: String as PropType<string>
  },
  tooltipClass: String as PropType<string>,
  marks: Object as PropType<{ [key: string]: unknown }>,

  // custom props
  text: String as PropType<string>,
  hue: {
    type: String as PropType<string>,
    default: 'default'
  },
  exclude: {
    type: [String, Number, RegExp] as PropType<InputExclude>,
    default: null
  },
  optionGroups: [Object, Array] as PropType<CustomInputOptions[]>
}

export const customInputProps = {
  // public
  value: {
    type: [String, Number, Array, Boolean, Date] as PropType<string | number | Array<unknown> | boolean | Date>,
    default: ''
  },
  type: {
    type: String as PropType<string>,
    default: 'text'
  },
  text: commonProps.text,
  multiple: commonProps.multiple,
  max: commonProps.max,
  min: commonProps.min,
  step: commonProps.step,
  popperClass: commonProps.popperClass,
  debounce: commonProps.debounce,

  // input
  size: commonProps.size,
  resize: commonProps.resize,
  form: commonProps.form,
  disabled: commonProps.disabled,
  readonly: commonProps.readonly,
  autosize: commonProps.autosize,
  autocomplete: commonProps.autocomplete,
  validateEvent: commonProps.validateEvent,
  suffixIcon: commonProps.suffixIcon,
  prefixIcon: commonProps.prefixIcon,
  clearable: commonProps.clearable,
  showPassword: commonProps.showPassword,
  showWordLimit: commonProps.showWordLimit,
  tabindex: commonProps.tabindex,

  // input - number
  stepStrictly: commonProps.stepStrictly,
  precision: commonProps.precision,
  controls: commonProps.controls,
  controlsPosition: commonProps.controlsPosition,

  // select
  automaticDropdown: commonProps.automaticDropdown,
  filterable: commonProps.filterable,
  allowCreate: commonProps.allowCreate,
  loading: commonProps.loading,
  remote: commonProps.remote,
  loadingText: commonProps.loadingText,
  noMatchText: commonProps.noMatchText,
  noDataText: commonProps.noDataText,
  remoteMethod: commonProps.remoteMethod,
  filterMethod: commonProps.filterMethod,
  multipleLimit: commonProps.multipleLimit,
  defaultFirstOption: commonProps.defaultFirstOption,
  reserveKeyword: commonProps.reserveKeyword,
  valueKey: commonProps.valueKey,
  collapseTags: commonProps.collapseTags,
  popperAppendToBody: commonProps.popperAppendToBody,

  // cascader
  props: commonProps.props,
  separator: commonProps.separator,
  showAllLevels: commonProps.showAllLevels,
  beforeFilter: commonProps.beforeFilter,

  // cascader - PopperMixin
  placement: commonProps.placement,
  appendToBody: commonProps.appendToBody,
  visibleArrow: commonProps.visibleArrow,
  arrowOffset: commonProps.arrowOffset,
  offset: commonProps.offset,
  boundariesPadding: commonProps.boundariesPadding,
  popperOptions: commonProps.popperOptions,
  transformOrigin: commonProps.transformOrigin,
  
  // date
  format: commonProps.format,
  valueFormat: commonProps.valueFormat,
  startPlaceholder: commonProps.startPlaceholder,
  endPlaceholder: commonProps.endPlaceholder,
  clearIcon: commonProps.clearIcon,
  editable: commonProps.editable,
  align: commonProps.align,
  defaultValue: commonProps.defaultValue,
  defaultTime: commonProps.defaultTime,
  rangeSeparator: commonProps.rangeSeparator,
  unlinkPanels: commonProps.unlinkPanels,

  // DatePicker
  timeArrowControl: commonProps.timeArrowControl,

  // TimePicker
  isRange: commonProps.isRange,
  arrowControl: commonProps.arrowControl,

  // switch
  width: commonProps.width,
  activeIconClass: commonProps.activeIconClass,
  inactiveIconClass: commonProps.inactiveIconClass,
  activeText: commonProps.activeText,
  inactiveText: commonProps.inactiveText,
  activeColor: commonProps.activeColor,
  inactiveColor: commonProps.inactiveColor,
  activeValue: commonProps.activeValue,
  inactiveValue: commonProps.inactiveValue,

  // upload
  action: commonProps.action,
  headers: commonProps.headers,
  data: commonProps.data,
  drag: commonProps.drag,
  dragger: commonProps.dragger,
  withCredentials: commonProps.withCredentials,
  showFileList: commonProps.showFileList,
  accept: commonProps.accept,
  beforeUpload: commonProps.beforeUpload,
  beforeRemove: commonProps.beforeRemove,
  onRemove: commonProps.onRemove,
  onChange: commonProps.onChange,
  onPreview: commonProps.onPreview,
  onSuccess: commonProps.onSuccess,
  onProgress: commonProps.onProgress,
  onError: commonProps.onError,
  fileList: commonProps.fileList,
  autoUpload: commonProps.autoUpload,
  listType: commonProps.listType,
  httpRequest: commonProps.httpRequest,
  limit: commonProps.limit,
  onExceed: commonProps.onExceed,

  // slider
  // value - default: 0
  // min - default: 0
  // max - default: 100
  // step - default: 1
  showInput: commonProps.showInput,
  showInputControls: commonProps.showInputControls,
  inputSize: commonProps.inputSize,
  showStops: commonProps.showStops,
  showTooltip: commonProps.showTooltip,
  formatTooltip: commonProps.formatTooltip,
  range: commonProps.range,
  vertical: commonProps.vertical,
  height: commonProps.height,
  tooltipClass: commonProps.tooltipClass,
  marks: commonProps.marks,
  options: commonProps.options,
  pickerOptions: commonProps.pickerOptions,
  hue: commonProps.hue,
  exclude: commonProps.exclude,
}

export type CustomInputProps = ExtractPropTypes<typeof customInputProps>

export const elFormItemProps = {
  label: commonProps.label,
  labelWidth: commonProps.labelWidth,
  prop: commonProps.prop,
  required: commonProps.required,
  rules: commonProps.rules,
  error: commonProps.error,
  validateStatus: commonProps.validateStatus,
  for: commonProps.for,
  inlineMessage: commonProps.inlineMessage,
  showMessage: commonProps.showMessage,
  size: commonProps.size
}

export type ElFormItemProps = ExtractPropTypes<typeof elFormItemProps>

export const elFormProps = {
  model: commonProps.model,
  rules: commonProps.rules,
  labelPosition: commonProps.labelPosition,
  labelWidth: commonProps.labelWidth,
  labelSuffix: commonProps.labelSuffix,
  inline: commonProps.inline,
  inlineMessage: commonProps.inlineMessage,
  statusIcon: commonProps.statusIcon,
  showMessage: commonProps.showMessage,
  size: commonProps.size,
  disabled: commonProps.disabled,
  validateOnRuleChange: commonProps.validateOnRuleChange,
  hideRequiredAsterisk: commonProps.hideRequiredAsterisk
}

export type ElFormProps = ExtractPropTypes<typeof elFormProps>