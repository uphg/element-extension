import { empty, booleanProp, stringProp, numberProp } from "../../../shared/commonProps";
import { ExtractPropTypes, PropType } from "vue";

export type GlobalPaginationProps = ExtractPropTypes<typeof globalPaginationProps>
export type PaginationProps = ExtractPropTypes<typeof paginationProps>

export const globalPaginationProps = {
  small: {
    type: booleanProp,
    default: empty
  },
  background: {
    type: booleanProp,
    default: empty
  },
  pagerCount: {
    type: numberProp,
    default: empty // 7
  },
  layout: {
    type: stringProp,
    default: empty // 'prev, pager, next, jumper, ->, total'
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default: empty // [10, 20, 30, 40, 50, 100]
  },
  popperClass: {
    type: stringProp,
    default: empty
  },
  prevText: {
    type: stringProp,
    default: empty
  },
  nextText: {
    type: stringProp,
    default: empty
  },
  hideOnSinglePage: {
    type: booleanProp,
    default: empty
  }
}

export const paginationProps = {
  pageSize: {
    type: numberProp,
    default: 10
  },
  total: numberProp,
  pageCount: numberProp,
  currentPage: {
    type: numberProp,
    default: 1
  },  
  disabled: booleanProp,
  ...globalPaginationProps
}