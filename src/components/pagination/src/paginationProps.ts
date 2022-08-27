import { ExtractPropTypes, PropType } from "vue";

export type PaginationProps = ExtractPropTypes<typeof paginationProps>

export const paginationProps = {
  pageSize: {
    type: Number as PropType<number>,
    default: 10
  },
  small: Boolean as PropType<boolean>,
  total: Number as PropType<number>,
  pageCount: Number as PropType<number>,
  pagerCount: {
    type: Number as PropType<number>,
    default: 7
  },
  currentPage: {
    type: Number as PropType<number>,
    default: 1
  },
  layout: {
    type: String as PropType<string>,
    default: 'prev, pager, next, jumper, ->, total'
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default() {
      return [10, 20, 30, 40, 50, 100];
    }
  },
  popperClass: String as PropType<string>,
  prevText: String as PropType<string>,
  nextText: String as PropType<string>,
  background: Boolean as PropType<boolean>,
  disabled: Boolean as PropType<boolean>,
  hideOnSinglePage: Boolean as PropType<boolean>
}