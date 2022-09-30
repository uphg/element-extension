import { CascaderOption } from "element-ui/types/cascader-panel";
import { CheckboxGroupOptions } from "src/components/checkbox-group/src/checkboxGroupProps";
import { RadioGroupOptions } from "src/components/radio-group/src/radioGroupProps";
import { SelectOptions } from "src/components/select/src/selectProps";
import { ExtractPropTypes, PropType } from "vue";
import { commonProps, elFormItemProps, empty } from "../../../shared/_commonProps";

export type FormItemBaseProps = ExtractPropTypes<typeof formItemBaseProps>
export type FormItemExtendsProps = ExtractPropTypes<typeof formItemExtendsProps>
export type FormItemProps = ExtractPropTypes<typeof formItemProps>

export const formItemBaseProps = {
  type: {
    type: String as PropType<string>,
    default: 'text'
  },
  value: {
    type: [String, Number, Array, Boolean, Date] as PropType<string | number | Array<unknown> | boolean | Date>,
    default: ''
  },
  clearable: commonProps.clearable,
  size: commonProps.size,
  disabled: commonProps.disabled,
  readonly: commonProps.readonly,
  showPassword: commonProps.showPassword,
  showWordLimit: commonProps.showWordLimit,
  validateEvent: commonProps.validateEvent,
  options: {
    type: [Array] as PropType<RadioGroupOptions | CheckboxGroupOptions | SelectOptions | CascaderOption[]>
  },
  action: commonProps.action,
  headers: commonProps.headers,
  multiple: commonProps.multiple,
  fileList: commonProps.fileList,
  accept: commonProps.accept,
  format: commonProps.format,
  pickerOptions: commonProps.pickerOptions,

  // custom props
  exclude: commonProps.exclude,
  optionGroups: commonProps.optionGroups,
  withBorder: {
    type: Boolean,
    default: empty
  },
  withButton: {
    type: Boolean,
    default: empty
  }
}

export const formItemExtendsProps = {
  popperClass: commonProps.popperClass,
  debounce: commonProps.debounce,

  // radio
  size: {
    type: [commonProps.size.type, undefined],
    default: empty
  },
  textColor: {
    type: [String, undefined],
    default: empty
  },
  fill: {
    type: [String, undefined],
    default: empty
  },

  // checkout
  min: {
    type: [Number, undefined],
    default: empty
  },
  max: {
    type: [Number, undefined],
    default: empty
  },

  // input
  tabindex: commonProps.tabindex,
  resize: commonProps.resize,
  form: commonProps.form,
  autocomplete: commonProps.autocomplete,
  autosize: commonProps.autosize,
  suffixIcon: commonProps.suffixIcon,
  prefixIcon: commonProps.prefixIcon,

  // input - number
  step: commonProps.step,
  stepStrictly: commonProps.stepStrictly,
  precision: commonProps.precision,
  controls: commonProps.controls,
  controlsPosition: commonProps.controlsPosition,

  // select
  id: String,
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

  // slider
  label: commonProps.label,

  // date
  defaultValue: commonProps.defaultValue,
  defaultTime: commonProps.defaultTime,
  valueFormat: commonProps.valueFormat,
  startPlaceholder: commonProps.startPlaceholder,
  endPlaceholder: commonProps.endPlaceholder,
  clearIcon: commonProps.clearIcon,
  editable: commonProps.editable,
  align: commonProps.align,
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
  limit: commonProps.limit,
  drag: commonProps.drag,
  data: commonProps.data,
  dragger: commonProps.dragger,
  withCredentials: commonProps.withCredentials,
  showFileList: commonProps.showFileList,
  beforeUpload: commonProps.beforeUpload,
  beforeRemove: commonProps.beforeRemove,
  onRemove: commonProps.onRemove,
  onChange: commonProps.onChange,
  onPreview: commonProps.onPreview,
  onSuccess: commonProps.onSuccess,
  onProgress: commonProps.onProgress,
  onError: commonProps.onError,
  autoUpload: commonProps.autoUpload,
  listType: commonProps.listType,
  httpRequest: commonProps.httpRequest,
  onExceed: commonProps.onExceed,
  action: commonProps.action,
  headers: commonProps.headers,
  multiple: commonProps.multiple,

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
  marks: commonProps.marks
}

export const formItemProps = {
  ...elFormItemProps,
  ...formItemBaseProps,
  extends: {
    type: Object as PropType<FormItemExtendsProps>,
    default: () => ({})
  }
}

