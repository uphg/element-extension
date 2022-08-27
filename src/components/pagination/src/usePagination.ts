import { Pagination } from "element-ui";
import { ElPagination } from "element-ui/types/pagination";
import { h, ref, SetupContext } from "vue";
import { PaginationProps } from "./paginationProps";

export function usePagination(props: PaginationProps, context: SetupContext<{}>) {
  const elPagination = ref<ElPagination | null>(null)
  const setRef = function(el: ElPagination) {
    elPagination.value = el
  } as unknown as string

  return {
    expose: {
      get elPagination() {
        return elPagination.value
      }
    },
    render: () => h(Pagination, {
      ref: setRef,
      props: {
        pageSize: props.pageSize,
        small: props.small,
        total: props.total,
        pageCount: props.pageCount,
        pagerCount: props.pagerCount,
        currentPage: props.currentPage,
        layout: props.layout,
        pageSizes: props.pageSizes,
        popperClass: props.popperClass,
        prevText: props.prevText,
        nextText: props.nextText,
        background: props.background,
        disabled: props.disabled,
        hideOnSinglePage: props.hideOnSinglePage
      },
      on: {
        'size-change': (value: number) => {
          context.emit('size-change', value)
        },
        'current-change': (value: number) => {
          context.emit('current-change', value)
        },
        'prev-click': (value: number) => {
          context.emit('prev-click', value)
        },
        'next-click': (value: number) => {
          context.emit('next-click', value)
        },
      }
    }, [context.slots.default?.()])
  }
}