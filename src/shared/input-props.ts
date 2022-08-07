import { ExtractPropTypes, PropType } from "vue";
import { ElUpload, FileListItem } from "element-ui/types/upload"
import { CascaderOption } from "element-ui/types/cascader-panel"
import { DatePickerOptions } from "element-ui/types/date-picker"
import { TimePickerOptions } from "element-ui/types/time-picker"
import { TimeSelectOptions } from "element-ui/types/time-select"
import { InputOptions } from '../types/input'

function noop() { }

export const inputProps = {
  value: {
    type: [String, Number, Array, Boolean, Date] as PropType<string | number | Array<unknown> | boolean | Date>,
    default: ''
  },
  type: {
    type: String as PropType<string>,
    default: 'text'
  },
  text: String as PropType<string>,
  disabled: Boolean as PropType<boolean>,
  clearable: Boolean as PropType<boolean>,
  showPassword: Boolean as PropType<boolean>,
  suffixIcon: String as PropType<string>,
  prefixIcon: String as PropType<string>,
  size: String as PropType<string>,
  maxlength: [String, Number] as PropType<string | number>,
  minlength: [String, Number] as PropType<string | number>,
  showWordLimit: Boolean as PropType<boolean>,
  multiple: Boolean as PropType<boolean>,
  max: Number as PropType<number>,
  min: Number as PropType<number>,
  step: {
    type: Number as PropType<number>,
    default: 1 // input-number & slider
  },

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
  multipleLimit: {
    type: Number as PropType<number>,
    default: 0
  },
  collapseTags: Boolean as PropType<boolean>,
  popperAppendToBody: {
    type: Boolean as PropType<boolean>,
    default: true
  },

  // cascader
  showAllLevels: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  props: Object as PropType<object>,

  // date
  format: String as PropType<string>,
  valueFormat: String as PropType<string>,
  readonly: Boolean as PropType<boolean>,
  startPlaceholder: String as PropType<string>,
  endPlaceholder: String as PropType<string>,
  clearIcon: {
    type: String as PropType<string>,
    default: 'el-icon-circle-close'
  },
  popperClass: String as PropType<string>,
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
  timeArrowControl: Boolean,

  // TimePicker
  isRange: Boolean,
  arrowControl: Boolean,

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
    type: Boolean,
    default: false
  },
  showInputControls: {
    type: Boolean,
    default: true
  },
  inputSize: {
    type: String,
    default: 'small'
  },
  showStops: {
    type: Boolean,
    default: false
  },
  showTooltip: {
    type: Boolean,
    default: true
  },
  formatTooltip: Function,
  range: {
    type: Boolean,
    default: false
  },
  vertical: {
    type: Boolean,
    default: false
  },
  height: {
    type: String
  },
  debounce: {
    type: Number,
    default: 300
  },
  tooltipClass: String,
  marks: Object,

  // other options
  validateEvent: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  options: [Array] as PropType<InputOptions[] | CascaderOption[]>,
  pickerOptions: [Object] as PropType<DatePickerOptions | TimePickerOptions | TimeSelectOptions>,
  hue: {
    type: String as PropType<string>,
    default: 'default'
  },
  exclude: [RegExp, String, Number] as PropType<RegExp | string | number>,
}

export type InputProps = ExtractPropTypes<typeof inputProps>
