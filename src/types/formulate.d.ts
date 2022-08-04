import { FormRule } from './form';
import { InputTypes, InputValue, InputOptions } from './input'
import { InputProps } from '../../shared/input-props'

export interface FormulateBaseFiled {
  label: string;
  type?: InputTypes | string;
  rules?: FormRule;
  required?: boolean;
  options?: InputOptions;
  [key: string]: any;
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

export interface FormulatePublicInputProps {
  vIf(formData: { [key: string]: InputValue }): boolean | undefined
}

export type PartialInputProps = Partial<InputProps & FormulatePublicInputProps>

