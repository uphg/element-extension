import { ExtractPropTypes, PropType } from "vue";
import { commonProps } from "./_commonProps";

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
