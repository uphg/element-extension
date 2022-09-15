import { Pagination } from "element-ui";
import { h, SetupContext } from "vue";
import { PaginationProps } from "./paginationProps";
import { GlobalPaginationProps } from "../../../components/config-provider/src/configProviderProps";
import { generateEmits } from "../../../utils/generateEmits";
import { useComponentProps, UseComponentParamsOptions } from "../../../composables/useComponentProps";

const propNames = ['pageSize', 'total', 'pageCount', 'currentPage', 'disabled']
const globalPropNames = ['small', 'pagerCount', 'layout', 'pageSizes', 'popperClass', 'prevText', 'nextText', 'background', 'hideOnSinglePage']
const emitNames = ['size-change', 'current-change', 'prev-click', 'next-click']

export function usePagination(
  props: PaginationProps,
  context: SetupContext<{}>,
  options?: UseComponentParamsOptions<PaginationProps, GlobalPaginationProps>
) {
  const { handleProps } = options || {}
  const createProps = useComponentProps(props, 'pagination', { propNames, globalPropNames, handleProps })
  const on = generateEmits(context.emit, emitNames)

  return {
    render: () => h(Pagination, { props: createProps(), on }, context.slots.default?.())
  }
}