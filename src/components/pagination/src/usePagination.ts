import { Pagination } from "element-ui";
import { useGlobalProps } from "../../../composables/useGlobalProps";
import { h, SetupContext } from "vue";
import { PaginationProps } from "./paginationProps";
import { GlobalPaginationProps } from "../../../components/config-provider/src/configProviderProps";
import { handleDefaultProps } from "../../../utils/handleDefaultProps";

export function usePagination(props: PaginationProps, context: SetupContext<{}>) {
  const globalPaginationProps = useGlobalProps<GlobalPaginationProps>('pagination')

  return {
    render: () => h(Pagination, {
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