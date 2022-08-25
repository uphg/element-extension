import { ExtractPropTypes, PropType } from "vue"

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>

export type GlobalInputProps = {
  maxlength: number;
}

export type GlobalFormProps = {
  inline: boolean;
  labelPosition: 'right' | 'left' | 'top';
  labelWidth: string; 
  inlineMessage: boolean;
}

export type GlobalTableProps = {
  maxHeight: string | number;
  stripe: boolean;
  border: boolean;
}

export const configProviderProps = {
  input: {
    type: Object as PropType<GlobalInputProps>,
    default: null
  },
  form: {
    type: Object as PropType<object>,
    default: null
  },
  table: {
    type: Object as PropType<object>,
    default: null
  }
}
