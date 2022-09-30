import { ElTable } from "element-ui/types/table";
import { TableObjectColumnProps } from "../src/components/table/src/tableProps";
import { useTable } from '../src/components/table'

export declare class ETable extends ElTable {
  columns: Array<TableObjectColumnProps>
}
export declare type useTable = typeof useTable

