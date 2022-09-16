import { empty } from "../../../shared/_commonProps";
import { ExtractPropTypes, PropType } from "vue"
import { ElementUIComponentSize } from "element-ui/types/component";
import { ObjectLike } from "../../../types/object-like";
import { GlobalCheckboxGroupProps } from "../../checkbox-group/src/checkboxGroupProps";
import { GlobalInputProps } from "../../input/src/inputProps";
import { GlobalInputNumberProps } from "../../input-number/src/inputNumberProps";
import { GlobalFormProps } from "../../form/src/formProps";
import { GlobalPaginationProps } from "../../pagination/src/paginationProps";
import { GlobalRadioGroupProps } from "../../radio-group/src/radioGroupProps";
import { GlobalSelectProps } from "../../select/src/selectProps";
import { GlobalSwitchProps } from "../../switch/src/switchProps";

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>

export type GlobalTableProps = {
  maxHeight: string | number;
  stripe: boolean;
  border: boolean;
  size: ElementUIComponentSize;
  fit: boolean;
  showHeader: boolean;
  highlightCurrentRow: boolean;
}

export type GlobalTableColumnProps = {
  showOverflowTooltip: boolean;
}

export type GlobalUploadProps = {
  action: string,
  headers: ObjectLike,
  multiple: boolean,
  data: ObjectLike,
  showFileList: boolean,
  drag: boolean,
  accept: string,
  listType: string,
  autoUpload: boolean,
  httpRequest:/*  (...args: unknown[]) => unknown | */ Function
}

export const configProviderProps = {
  radioGroup: {
    type: Object as PropType<GlobalRadioGroupProps>,
    default: empty
  },
  checkboxGroup: {
    type: Object as PropType<GlobalCheckboxGroupProps>,
    default: empty
  },
  input: {
    type: Object as PropType<GlobalInputProps>,
    default: empty
  },
  inputNumber: {
    type: Object as PropType<GlobalInputNumberProps>,
    default: empty
  },
  select: {
    type: Object as PropType<GlobalSelectProps>,
    default: empty
  },
  switch: {
    type: Object as PropType<GlobalSwitchProps>,
    default: empty
  },
  form: {
    type: Object as PropType<GlobalFormProps>,
    default: empty
  },
  table: {
    type: Object as PropType<GlobalTableProps>,
    default: empty
  },
  tableColumn: {
    type: Object as PropType<GlobalTableColumnProps>,
    default: empty
  },
  pagination: {
    type: Object as PropType<GlobalPaginationProps>,
    default: empty
  },
  upload: {
    type: Object as PropType<GlobalUploadProps>,
    default: empty
  }
}
