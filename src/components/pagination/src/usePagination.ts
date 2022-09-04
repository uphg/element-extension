import { Pagination } from "element-ui";
import { useGlobalProps } from "../../../composables/useGlobalProps";
import { h, SetupContext } from "vue";
import { PaginationProps } from "./paginationProps";
import { GlobalPaginationProps } from "../../../components/config-provider/src/configProviderProps";
import { handleDefaultProps } from "../../../utils/handleDefaultProps";
import { generateEmits } from "../../../utils/generateEmits";
import { generateProps } from "../../../utils/generateProps";

const propNames = ['pageSize', 'total', 'pageCount', 'currentPage', 'disabled']
const globalPropNames = ['small', 'pagerCount', 'layout', 'pageSizes', 'popperClass', 'prevText', 'nextText', 'background', 'hideOnSinglePage']
const emitNames = ['size-change', 'current-change', 'prev-click', 'next-click']

export function usePagination(props: PaginationProps, context: SetupContext<{}>) {
  const globalPaginationProps = useGlobalProps<GlobalPaginationProps>('pagination')
  const on = generateEmits(context.emit, emitNames)

  return {
    render: () => h(Pagination, {
      props: {
        ...generateProps(props, propNames),
        ...handleDefaultProps<GlobalPaginationProps>(props as GlobalPaginationProps, globalPaginationProps, globalPropNames)
      },
      on
    }, [context.slots.default?.()])
  }
}