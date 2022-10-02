import { t } from 'element-ui/src/locale';
import { empty, booleanProp, stringProp, numberProp, objectProp } from '../../../shared/commonProps';
import { ExtractPropTypes, PropType } from 'vue';
import { ObjectLike } from '../../../../types/_common';

export type GlobalCascaderProps = ExtractPropTypes<typeof globalCascaderProps>
export type CascaderProps = ExtractPropTypes<typeof cascaderProps>

export const globalCascaderProps = {
  options: {
    type: Array,
    default: empty
  },
  props: {
    type: objectProp,
    default: empty
  },
  size: {
    type: stringProp,
    default: empty
  },
  clearable: {
    type: booleanProp,
    default: empty
  },
  popperClass: {
    type: stringProp,
    default: empty
  },
  separator: {
    type: stringProp,
    default: empty // ' / '
  },
  filterable: {
    type: booleanProp,
    default: empty
  },
  filterMethod: {
    type: Function,
    default: empty
  },
  beforeFilter: {
    type: Function,
    default: empty // () => (() => {})
  },
  showAllLevels: {
    type: booleanProp,
    default: empty // true
  },
  collapseTags: {
    type: booleanProp,
    default: empty
  },
  debounce: {
    type: numberProp,
    default: empty // 300
  },

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
    type: objectProp,
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
    type: stringProp,
    default: () => t('el.cascader.placeholder')
  },
  disabled: booleanProp,

  ...globalCascaderProps
}