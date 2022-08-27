import { empty } from "../../../shared/_commonProps";
import { ExtractPropTypes, PropType } from "vue"
import { ElementUIComponentSize } from "element-ui/types/component";

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>

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
}

export const configProviderProps = {
  input: {
    type: Object as PropType<GlobalInputProps>,
    default: () => ({
      clearable: false,
      showWordLimit: false,
      autosize: false,
      size: empty,
      maxlength: empty,
    })
  },
  form: {
    type: Object as PropType<GlobalFormProps>,
    default: () => ({
      inline: false,
      labelPosition: 'right',
      labelWidth: void 0,
      inlineMessage: '',
      size: empty
    })
  },
  table: {
    type: Object as PropType<GlobalTableProps>,
    default: () => ({
      maxHeight: empty,
      stripe: false,
      border: false,
      size: empty
    })
  }
}
