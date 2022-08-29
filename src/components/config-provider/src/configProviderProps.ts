import { empty } from "../../../shared/_commonProps";
import { ExtractPropTypes, PropType } from "vue"
import { ElementUIComponentSize } from "element-ui/types/component";

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>

export type ConfigComponentPropNames = (keyof GlobalInputProps) | (keyof GlobalFormProps) | (keyof GlobalTableProps) | (keyof GlobalTableColumnProps)

export type GlobalInputProps = {
  clearable: boolean;
  showWordLimit: boolean;
  autosize: boolean | { [key: string]: any };
  size: ElementUIComponentSize;
  maxlength?: number;
}

export type GlobalFormProps = {
  inline: boolean;
  labelPosition: 'right' | 'left' | 'top';
  labelWidth: string; 
  inlineMessage: boolean;
  size: ElementUIComponentSize
}

export type GlobalTableProps = {
  maxHeight: string | number;
  stripe: boolean;
  border: boolean;
  size: ElementUIComponentSize;
  fit: boolean;
  showHeader: boolean;
  highlightCurrentRow: boolean;
}

export type GlobalTableColumnProps = {
  stripe: boolean;
  border: boolean;
  size: ElementUIComponentSize;
  showOverflowTooltip: boolean;
}

export type GlobalPaginationProps = {
  small: boolean;
  background: boolean;
  pagerCount: number;
  layout: string;
  pageSizes: number[];
  popperClass: string;
  prevText: string;
  nextText: string;
  hideOnSinglePage: boolean;
}

export type DefaultProps = typeof defaultProps

export const defaultProps = {
  input: {
    clearable: empty, // false
    showWordLimit: empty, // false
    autosize: empty, // false
    size: empty,
    maxlength: empty,
  },
  form: {
    inline: empty, // false
    labelPosition: empty, // 'right'
    labelWidth: empty,
    inlineMessage: empty,
    size: empty
  },
  table: {
    maxHeight: empty,
    stripe: empty, // false
    border: empty, // false
    size: empty,
    fit: empty, // true
    showHeader: empty, // true
    highlightCurrentRow: empty // false
  },
  tableColumn: {
    stripe: empty,
    border: empty,
    size: empty,
    showOverflowTooltip: empty
  },
  pagination: {
    small: empty, // false
    background: empty, // false
    pagerCount: empty, // 7
    layout: empty, // 'prev, pager, next, jumper, ->, total'
    pageSizes: empty, // [10, 20, 30, 40, 50, 100]
    popperClass: empty,
    prevText: empty,
    nextText: empty,
    hideOnSinglePage: empty,
  }
}

export const configProviderProps = {
  input: {
    type: Object as PropType<GlobalInputProps>,
    default: empty
  },
  form: {
    type: Object as PropType<GlobalFormProps>,
    default: empty
  },
  table: {
    type: Object as PropType<GlobalTableProps>,
    default: empty
  },
  tableColumn: {
    type: Object as PropType<GlobalTableColumnProps>,
    default: empty
  },
  pagination: {
    type: Object as PropType<GlobalPaginationProps>,
    default: empty
  },
}
