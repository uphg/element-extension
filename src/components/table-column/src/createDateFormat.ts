import { formatDate } from "element-ui/src/utils/date-util"
import { RowCallbackParams } from "src/types/table"
import { defaultFormats, TableColumnExtendsType, TableColumnProps } from "./tableColumnProps"

export function createDateFormat<T extends TableColumnProps>(props: T) {
  const format = defaultFormats[props.type as TableColumnExtendsType]
  return (row: RowCallbackParams['row']) => formatDate(row[props.prop!], format)
}