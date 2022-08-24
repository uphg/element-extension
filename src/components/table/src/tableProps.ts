import { ButtonType } from "element-ui/types/button";
import { ElementUIComponentSize } from "element-ui/types/component";
import { rowCallbackParams } from "element-ui/types/table";
import { ExtractPropTypes, PropType } from "vue";
import { ScopedSlot } from "vue/types/vnode";

export type TableProps = ExtractPropTypes<typeof tableProps>
export type ElTableColumnProps = ExtractPropTypes<typeof elTableColumnProps>
export type TableColumnChildrenProps = {
  type: 'button' | 'link';
  text: string;
  hue: ButtonType;
  size: ElementUIComponentSize;
  onClick: (scope: rowCallbackParams) => void
}
export type TableColumnOptions = {
  value: any;
  label: string;
}
export type TableColumnProps = {
  emptyText?: string;
  // options?: TableColumnOptions[];
  children?: TableColumnChildrenProps[];
  scopedSlots?: { [key: string]: ScopedSlot | undefined };
  handleValue?: (scope: rowCallbackParams) => void | any;
} & ElTableColumnProps

export const elTableColumnProps = {
  type: {
    type: String,
    default: 'default'
  },
  label: String,
  className: String,
  labelClassName: String,
  property: String,
  prop: String,
  width: {},
  minWidth: {},
  renderHeader: Function,
  sortable: {
    type: [Boolean, String],
    default: false
  },
  sortMethod: Function,
  sortBy: [String, Function, Array],
  resizable: {
    type: Boolean,
    default: true
  },
  columnKey: String,
  align: String,
  headerAlign: String,
  showTooltipWhenOverflow: Boolean,
  showOverflowTooltip: Boolean,
  fixed: [Boolean, String],
  formatter: Function,
  selectable: Function,
  reserveSelection: Boolean,
  filterMethod: Function,
  filteredValue: Array,
  filters: Array,
  filterPlacement: String,
  filterMultiple: {
    type: Boolean,
    default: true
  },
  index: [Number, Function],
  sortOrders: {
    type: Array,
    default() {
      return ['ascending', 'descending', null];
    },
    validator(val: any) {
      return val.every((order: string) => ['ascending', 'descending', null].indexOf(order) > -1);
    }
  }
}

export const tableProps = {
  data: {
    type: Array,
    default: function() {
      return [];
    }
  },
  size: String,
  width: [String, Number],
  height: [String, Number],
  maxHeight: [String, Number],
  fit: {
    type: Boolean,
    default: true
  },
  stripe: Boolean,
  border: Boolean,
  rowKey: [String, Function],
  context: {},
  showHeader: {
    type: Boolean,
    default: true
  },
  showSummary: Boolean,
  sumText: String,
  summaryMethod: Function,
  rowClassName: [String, Function],
  rowStyle: [Object, Function],
  cellClassName: [String, Function],
  cellStyle: [Object, Function],
  headerRowClassName: [String, Function],
  headerRowStyle: [Object, Function],
  headerCellClassName: [String, Function],
  headerCellStyle: [Object, Function],
  highlightCurrentRow: Boolean,
  currentRowKey: [String, Number],
  emptyText: String,
  expandRowKeys: Array,
  defaultExpandAll: Boolean,
  defaultSort: Object,
  tooltipEffect: String,
  spanMethod: Function,
  selectOnIndeterminate: {
    type: Boolean,
    default: true
  },
  indent: {
    type: Number,
    default: 16
  },
  treeProps: {
    type: Object,
    default() {
      return {
        hasChildren: 'hasChildren',
        children: 'children'
      };
    }
  },
  lazy: Boolean,
  load: Function,

  columns: {
    type: Array as PropType<Array<TableColumnProps>>,
    default: () => []
  },
}
