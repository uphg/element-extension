import { Pagination } from "element-ui";
import { ElPagination } from "element-ui/types/pagination";
import { useGlobalProps } from "../../../composables/useGlobalProps";
import { h, ref, SetupContext } from "vue";
import { PaginationProps } from "./paginationProps";
import { GlobalPaginationProps } from "../../../components/config-provider/src/configProviderProps";
import { handleDefaultProps } from "../../../utils/handleDefaultProps";

export function usePagination(props: PaginationProps, context: SetupContext<{}>) {
  const elPagination = ref<ElPagination | null>(null)
  const globalPaginationProps = useGlobalProps<GlobalPaginationProps>('pagination')

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
        total: props.total,
        pageCount: props.pageCount,
        currentPage: props.currentPage,
        disabled: props.disabled,
        ...handleDefaultProps<GlobalPaginationProps>(props as GlobalPaginationProps, globalPaginationProps, ['small', 'pagerCount', 'layout', 'pageSizes', 'popperClass', 'prevText', 'nextText', 'background', 'hideOnSinglePage'])
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