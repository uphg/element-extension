import { Pagination } from "element-ui";
import { h, SetupContext } from "vue";
import { PaginationProps, GlobalPaginationProps } from "./paginationProps";
import { generateEmits } from "../../../utils/generateEmits";
import { useComponentProps, UseComponentParamsOptions } from "../../../composables/useComponentProps";
import { globalPaginationPropNames } from "../../../shared/configPropertyMap";
import { ObjectLike } from "../../../types/object-like";

const propNames = ['pageSize', 'total', 'pageCount', 'currentPage', 'disabled']
const emitNames = ['size-change', 'current-change', 'prev-click', 'next-click']

export function usePagination(
  props: PaginationProps,
  context: SetupContext<{}>,
  options?: UseComponentParamsOptions<PaginationProps | ObjectLike, GlobalPaginationProps>
) {
  const { handleProps } = options || {}
  const { createProps } = useComponentProps(props, 'pagination', { propNames, globalPropNames: globalPaginationPropNames, handleProps })
  const on = generateEmits(context.emit, emitNames)

  return {
    render: () => h(Pagination, { props: createProps(), on }, context.slots.default?.())
  }
}