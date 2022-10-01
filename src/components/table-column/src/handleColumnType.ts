import { elTableColumnTypes } from "./tableColumnProps";

export function handleColumnType(type: string) {
  return elTableColumnTypes.includes(type) ? type : void 0
}