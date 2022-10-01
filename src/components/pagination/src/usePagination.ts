import { Pagination } from "element-ui";
import { h, SetupContext } from "vue";
import { PaginationProps, GlobalPaginationProps } from "./paginationProps";
import { useComponentProps, UseComponentParamsOptions } from "../../../composables/useComponentProps";
import { globalPaginationPropNames } from "../../../shared/configPropertyMap";
import { ObjectLike } from "../../../../types/_common";

const propNames = ['pageSize', 'total', 'pageCount', 'currentPage', 'disabled']

export function usePagination(
  props: PaginationProps,
  context?: SetupContext<{}>,
  options?: UseComponentParamsOptions<PaginationProps | ObjectLike, GlobalPaginationProps>
) {
  const { handleProps } = options || {}
  const { createProps } = useComponentProps(props, 'pagination', { propNames, globalPropNames: globalPaginationPropNames, handleProps })
  const on = context?.emit ? {
    'size-change': (size: number) => {
      context?.emit('size-change', size)
    },
    'current-change': (current: number) => {
      context?.emit('current-change', current)
    },
    'prev-click': (current: number) => {
      context?.emit('prev-click', current)
    },
    'next-click': (current: number) => {
      context?.emit('next-click', current)
    }
  } : options?.on

  return {
    render: () => h(Pagination, { props: createProps(), on }, context?.slots.default?.())
  }
}