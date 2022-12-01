import { ExtractPropTypes, PropType } from "vue";
import { ScopedSlot } from "vue/types/vnode";
import { ButtonType } from "element-ui/types/button";
import { ElementUIComponentSize } from "element-ui/types/component";
import { empty, booleanProp, stringProp, numberProp, objectProp, functionProp, sizeProp } from "../../../shared/commonProps";
import { VNode, VNodeData } from "vue/types/umd";
import { RowCallbackParams } from "../../../../types/_element-ui";
import { TableColumnProps } from "../../../components/table-column/src/tableColumnProps";
import { TableColumn } from "element-ui";
import { ObjectLike, Fn } from "../../../../types/_common";

export type GlobalTableProps = ExtractPropTypes<typeof globalTableProps>
export type TableProps = ExtractPropTypes<typeof tableProps>

export type TableColumnChildrenProps = Partial<{
  class: VNodeData['class'];
  style: VNodeData['style'];
  type: 'button' | 'link' | 'tag';
  text: string;
  hue: ButtonType;
  size: ElementUIComponentSize;
  underline: boolean;
  href: string;
  icon: string;
  disabled: boolean;
  loading: boolean;
  nativeType: string;
  plain: boolean;
  autofocus: boolean;
  round: boolean;
  circle: boolean;
  closable: boolean;
  hit: boolean;
  disableTransitions: boolean;
  color: string;
  effect: string;
  onClick: (scope: RowCallbackParams, event?: MouseEvent) => void
  onClose: (scope: RowCallbackParams, event?: MouseEvent) => void
}>

export type TableObjectColumnProps = {
  children?: TableColumnChildrenProps[] | ((scope: { row: RowCallbackParams['row'], column: TableColumn, $index: number }) => VNode);
  scopedSlots?: { [key: string]: ScopedSlot | undefined };
} & TableColumnProps

const stringOrFnProp = [String, Function] as PropType<string | Fn>
const objectOrFnProp = [Object, Function] as PropType<ObjectLike | Fn>
const stringOrNumberProp = [String, Number] as PropType<string | number>

export const globalTableProps = {
  // global props
  height: {
    type: stringOrNumberProp,
    default: empty
  },
  rowKey: {
    type: stringOrFnProp,
    default: empty
  },
  context: {
    default: empty // {}
  },
  showSummary: {
    type: booleanProp,
    default: empty
  },
  sumText: {
    type: stringProp,
    default: empty
  },
  summaryMethod: {
    type: functionProp,
    default: empty
  },
  rowClassName: {
    type: stringOrFnProp,
    default: empty
  },
  rowStyle: {
    type: objectOrFnProp,
    default: empty
  },
  cellClassName: {
    type: stringOrFnProp,
    default: empty
  },
  cellStyle: {
    type: objectOrFnProp,
    default: empty
  },
  headerRowClassName: {
    type: stringOrFnProp,
    default: empty
  },
  headerRowStyle: {
    type: objectOrFnProp,
    default: empty
  },
  headerCellClassName: {
    type: stringOrFnProp,
    default: empty
  },
  headerCellStyle: {
    type: objectOrFnProp,
    default: empty
  },
  currentRowKey: {
    type: stringOrNumberProp,
    default: empty
  },
  emptyText: {
    type: stringProp,
    default: empty
  },
  expandRowKeys: {
    type: Array,
    default: empty
  },
  defaultExpandAll: {
    type: booleanProp,
    default: empty
  },
  defaultSort: {
    type: objectProp,
    default: empty
  },
  tooltipEffect: {
    type: stringProp,
    default: empty
  },
  spanMethod: {
    type: functionProp,
    default: empty
  },
  selectOnIndeterminate: {
    type: booleanProp,
    default: empty // true
  },
  indent: {
    type: numberProp,
    default: empty // 16
  },
  treeProps: {
    type: objectProp,
    default: empty // () => ({ hasChildren: 'hasChildren', children: 'children' })
  },
  lazy: {
    type: booleanProp,
    default: empty
  },
  load: {
    type: functionProp,
    default: empty
  },
  maxHeight: {
    type: stringOrNumberProp,
    default: empty
  },
  stripe: {
    type: booleanProp,
    default: empty
  },
  border: {
    type: booleanProp,
    default: empty
  },
  fit: {
    type: booleanProp,
    default: empty // true
  },
  showHeader: {
    type: booleanProp,
    default: empty // true
  },
  highlightCurrentRow: {
    type: booleanProp,
    default: empty
  },
  size: sizeProp,
}

export const tableBaseProps = {
  data: {
    type: Array,
    default: function() {
      return [];
    }
  }
}

export const tableProps = {
  ...tableBaseProps,
  ...globalTableProps,
  // custom props
  columns: {
    type: Array as PropType<Array<TableObjectColumnProps | (() => VNode)>>,
    default: () => []
  },
}
