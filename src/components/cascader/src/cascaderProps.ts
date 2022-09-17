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