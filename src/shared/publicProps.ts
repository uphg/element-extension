import { PropType } from "vue";
import { ElUpload, FileListItem } from "element-ui/types/upload"
import { CascaderOption } from "element-ui/types/cascader-panel"
import { DatePickerOptions } from "element-ui/types/date-picker"
import { TimePickerOptions } from "element-ui/types/time-picker"
import { TimeSelectOptions } from "element-ui/types/time-select"
import { CustomInputOptions } from '../types/customInput'
import { InputExclude } from "../types/input";
import { QueryChangeHandler } from 'element-ui/types/select'

function noop() { }

export const publicProps = {
  // formulate: props.value
  value: {
    type: [String, Number, Array, Boolean, Date] as PropType<string | number | Array<unknown> | boolean | Date>,
    default: ''
  },
  text: String as PropType<string>,
  multiple: Boolean as PropType<boolean>,
  max: Number as PropType<number>,
  min: Number as PropType<number>,
  step: {
    type: Number as PropType<number>,
    default: 1 // input-number & slider
  },
  popperClass: String as PropType<string>,
  debounce: {
    type: Number as PropType<number>,
    default: 300
  },

  // input
  size: String as PropType<string>,
  resize: String as PropType<string>,
  form: String as PropType<string>,
  disabled: Boolean as PropType<boolean>,
  readonly: Boolean as PropType<boolean>,
  type: {
    type: String as PropType<string>,
    default: 'text'
  },
  autosize: {
    type: [Boolean, Object] as PropType<boolean | { [key: string]: any }>,
    default: false
  },
  autocomplete: {
    type: String as PropType<string>,
    default: 'off'
  },
  validateEvent: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  suffixIcon: String as PropType<string>,
  prefixIcon: String as PropType<string>,
  clearable: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  showPassword: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  showWordLimit: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  tabindex: String as PropType<string>,

  // input - number
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

  // select
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

  // cascader
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

  // cascader - PopperMixin
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
    // required: true
  },
  headers: {
    type: Object as PropType<object>,
    default() {
      return {};
    }
  },
  data: Object as PropType<object>,
  // name: {
  //   type: String,
  //   default: 'file'
  // },
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

  // other options
  options: [Array] as PropType<CustomInputOptions[] | CascaderOption[]>,
  pickerOptions: [Object] as PropType<DatePickerOptions | TimePickerOptions | TimeSelectOptions>,

  // custom props
  hue: {
    type: String as PropType<string>,
    default: 'default'
  },
  exclude: {
    type: [String, Number, RegExp] as PropType<InputExclude>,
    default: null
  },
  withOptionGroup: Boolean as PropType<boolean>
}