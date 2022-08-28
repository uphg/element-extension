import { empty } from "../../../shared/_commonProps";
import { ExtractPropTypes, PropType } from "vue"
import { ElementUIComponentSize } from "element-ui/types/component";

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>

export type ConfigComponentPropNames = (keyof GlobalInputProps) | (keyof GlobalFormProps) | (keyof GlobalTableProps) | (keyof GlobalTableColumnProps)

export type GlobalInputProps = {
  clearable: boolean;
  showWordLimit: boolean;
  autosize: boolean | { [key: string]: any };
  size: ElementUIComponentSize;
  maxlength?: number;
}

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
  resizable: boolean;
  showOverflowTooltip: boolean;
}

export const defaultProps = {
  input: {
    clearable: false,
    showWordLimit: false,
    autosize: false,
    size: empty,
    maxlength: empty,
  },
  form: {
    inline: false,
    labelPosition: 'right',
    labelWidth: void 0,
    inlineMessage: '',
    size: empty
  },
  table: {
    maxHeight: empty,
    stripe: false,
    border: false,
    size: empty,
    fit: true,
    showHeader: true,
    highlightCurrentRow: false
  },
  tableColumn: {
    maxHeight: empty,
    stripe: false,
    border: false,
    size: empty
  }
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
  }
}
