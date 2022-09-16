import { empty } from "../../../shared/_commonProps";
import { ExtractPropTypes, PropType } from "vue";

export type GlobalPaginationProps = ExtractPropTypes<typeof globalPaginationProps>
export type PaginationProps = ExtractPropTypes<typeof paginationProps>

export const globalPaginationProps = {
  small: {
    type: Boolean as PropType<boolean>,
    default: empty
  },
  background: {
    type: Boolean as PropType<boolean>,
    default: empty
  },
  pagerCount: {
    type: Number as PropType<number>,
    default: empty // 7
  },
  layout: {
    type: String as PropType<string>,
    default: empty // 'prev, pager, next, jumper, ->, total'
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default: empty // [10, 20, 30, 40, 50, 100]
  },
  popperClass: {
    type: String as PropType<string>,
    default: empty
  },
  prevText: {
    type: String as PropType<string>,
    default: empty
  },
  nextText: {
    type: String as PropType<string>,
    default: empty
  },
  hideOnSinglePage: {
    type: Boolean as PropType<boolean>,
    default: empty
  }
}

export const paginationProps = {
  pageSize: {
    type: Number as PropType<number>,
    default: 10
  },
  total: Number as PropType<number>,
  pageCount: Number as PropType<number>,
  currentPage: {
    type: Number as PropType<number>,
    default: 1
  },  
  disabled: Boolean as PropType<boolean>,
  ...globalPaginationProps
}