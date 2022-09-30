import { t } from 'element-ui/src/locale';
import { empty } from '../../../shared/_commonProps';
import { ExtractPropTypes, PropType } from 'vue';

export type GlobalCascaderProps = ExtractPropTypes<typeof globalCascaderProps>
export type CascaderProps = ExtractPropTypes<typeof cascaderProps>

export const globalCascaderProps = {
  options: {
    type: Array,
    default: empty
  },
  props: {
    type: Object,
    default: empty
  },
  size: {
    type: String,
    default: empty
  },
  clearable: {
    type: Boolean,
    default: empty
  },
  popperClass: {
    type: String,
    default: empty
  },
  separator: {
    type: String,
    default: ' / '
  },
  showAllLevels: {
    type: Boolean,
    default: true
  },
  collapseTags: Boolean,

  // mixin props
  placement: {
    type: [String, undefined],
    default: empty //  'bottom-start'
  },
  appendToBody: {
    type: [Boolean, undefined],
    default: empty // true
  },
  visibleArrow: {
    type: Boolean,
    default: empty // true
  },
  arrowOffset: {
    type: [Number, undefined],
    default: empty // 35
  },
  offset: {
    default: empty // 0
  },
  boundariesPadding: {
    type: [Number, undefined],
    default: empty // 5
  },
  popperOptions: {
    type: [Object, undefined],
    default: empty // () => ({ gpuAcceleration: false })
  },
  transformOrigin: {
    type: [Boolean, String, undefined],
    default: empty // true
  }
}

export const cascaderProps = {
  value: {
    type: [String, Number, Boolean, Symbol, Object] as PropType<any>,
    default: {}
  },
  placeholder: {
    type: String,
    default: () => t('el.cascader.placeholder')
  },
  disabled: Boolean,
  filterable: Boolean,
  filterMethod: Function,
  debounce: {
    type: Number,
    default: 300
  },
  beforeFilter: {
    type: Function,
    default: () => (() => {})
  },
  ...globalCascaderProps
}