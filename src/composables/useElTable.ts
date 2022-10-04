import { ref } from "vue";
import { ElTable, treeNode } from "element-ui/types/table";
import { EmitFn } from "vue/types/v3-setup-context";
import { generateEmits } from "../utils";

const elTableEmitNames = ['select', 'select-all', 'selection-change', 'cell-mouse-enter', 'cell-mouse-leave', 'cell-click', 'cell-dblclick', 'row-click', 'row-contextmenu', 'row-dblclick', 'header-click', 'header-contextmenu', 'sort-change', 'filter-change', 'current-change', 'header-dragend', 'expand-change']

export function useElTable() {
  const elTable = ref<ElTable | null>(null)

  function clearSelection() {
    elTable.value?.clearSelection()
  }

  function toggleRowSelection(row: object, selected?: boolean) {
    elTable.value?.toggleRowSelection(row, selected)
  }

  function toggleAllSelection() {
    elTable.value?.toggleAllSelection()
  }

  function toggleRowExpansion(row: object, expanded?: boolean) {
    elTable.value?.toggleRowExpansion(row, expanded)
  }

  function setCurrentRow(row?: object) {
    elTable.value?.setCurrentRow(row)
  }

  function clearSort() {
    elTable.value?.clearSort()
  }

  function clearFilter() {
    elTable.value?.clearFilter()
  }

  function doLayout() {
    elTable.value?.doLayout()
  }

  function sort(prop: string, order: string) {
    elTable.value?.sort(prop, order)
  } 

  function load (row: object, treeNode: treeNode, resolve: Function) {
    elTable.value?.load(row, treeNode, resolve)
  }

  return {
    elTable,
    clearSelection,
    toggleRowSelection,
    toggleAllSelection,
    toggleRowExpansion,
    setCurrentRow,
    clearSort,
    clearFilter,
    doLayout,
    sort,
    load
  }
}
export function useElTableEmit(emit: EmitFn) {
  return generateEmits(emit, elTableEmitNames)
}
