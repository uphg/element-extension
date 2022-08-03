import { FormRule } from './form';
import { InputTypes, InputOptions } from './input'

export interface FormulateBaseFiled {
  label: string;
  type?: InputTypes | string;
  rules?: FormRule;
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

export interface ErrorFormat {
  (options: { type?: string, key: string, label: string }): FormRule | []
}