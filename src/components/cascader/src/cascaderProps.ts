import { t } from 'element-ui/src/locale';
import { empty, booleanProp } from '../../../shared/commonProps';
import { ExtractPropTypes, PropType } from 'vue';
import { ObjectLike } from '../../../../types/_common';

export type GlobalCascaderProps = ExtractPropTypes<typeof globalCascaderProps>
export type CascaderProps = ExtractPropTypes<typeof cascaderProps>

const stringProp = String as PropType<string>
const numberProp = Number as PropType<number>

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
    type: stringProp,
    default: empty //  'bottom-start'
  },
  appendToBody: {
    type: booleanProp,
    default: empty // true
  },
  visibleArrow: {
    type: booleanProp,
    default: empty // true
  },
  arrowOffset: {
    type: numberProp,
    default: empty // 35
  },
  offset: {
    default: empty // 0
  },
  boundariesPadding: {
    type: numberProp,
    default: empty // 5
  },
  popperOptions: {
    type: [Object, undefined] as PropType<ObjectLike>,
    default: empty // () => ({ gpuAcceleration: false })
  },
  transformOrigin: {
    type: [Boolean, String, undefined] as PropType<boolean | string>,
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