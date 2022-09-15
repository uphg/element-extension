import { empty } from "../../../shared/_commonProps";
import { ExtractPropTypes, PropType } from "vue"
import { ElementUIComponentSize } from "element-ui/types/component";
import { ObjectLike } from "../../../types/object-like";

import { GlobalCheckboxGroupProps } from "../../checkbox-group/src/checkboxGroupProps";
import { GlobalInputProps } from "../../input/src/inputProps";

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>

export type GlobalFormProps = {
  inline: boolean;
  labelPosition: 'right' | 'left' | 'top';
  labelWidth: string; 
  inlineMessage: boolean;
  size: ElementUIComponentSize
}

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

export type GlobalPaginationProps = {
  small: boolean;
  background: boolean;
  pagerCount: number;
  layout: string;
  pageSizes: number[];
  popperClass: string;
  prevText: string;
  nextText: string;
  hideOnSinglePage: boolean;
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

export type GlobalRadioGroup = {
  size: ElementUIComponentSize;
  textColor: string;
  fill: string;
}

// export type GlobalCheckboxGroup = {
//   min: number;
//   max: number;
//   size: ElementUIComponentSize;
//   textColor: string;
//   fill: string;
// }

export type GlobalInputNumber = {
  min: number;
  max: number;
  step: number;
  stepStrictly: boolean;
  precision: number;
  size: ElementUIComponentSize;
  controls: boolean;
  controlsPosition: string;
}

export type GlobalSwitchProps = {
  width: number;
  activeIconClass: string;
  inactiveIconClass: string;
  activeText: string;
  inactiveText: string;
  activeValue: boolean | string | number;
  inactiveValue: boolean | string | number;
  activeColor: string;
  inactiveColor: string;
  validateEvent: boolean;
}

export const configProviderProps = {
  input: {
    type: Object as PropType<GlobalInputProps>,
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
  },
  radioGroup: {
    type: Object as PropType<GlobalRadioGroup>,
    default: empty
  },
  checkboxGroup: {
    type: Object as PropType<GlobalCheckboxGroupProps>,
    default: empty
  },
  inputNumber: {
    type: Object as PropType<GlobalInputNumber>,
    default: empty
  },
  switch: {
    type: Object as PropType<GlobalSwitchProps>,
    default: empty
  }
}
