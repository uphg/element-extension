import { InputTypes, InputOptions } from './input'

export interface FormulateBaseFiled {
  label: string;
  type?: InputTypes;
  required?: boolean;
  options?: InputOptions;
}

export interface FormulateFiled extends FormulateBaseFiled {
  key: string;
}

export type FormulateFullFileds = {
  [key: string]: FormulateBaseFiled;
  $footer?: FormulateBaseFiled | FormulateFiled[]
}

export type FormulateFileds = FormulateFullFileds | FormulateFiled[]
