import { SimElementComponent } from './component'
import { FormData, FormRule } from './form';
import { CustomInputTypes, CustomInputValue, CustomInputOptions } from './input'
import { CustomInputProps } from '../../shared/input-props'
import { ElementUIComponentSize } from 'element-ui/types/component';
import { FormItemLabelPosition, ValidateCallback, ValidateFieldCallback } from 'element-ui/types/form';

export interface FormulateBaseFiled {
  label: string;
  type?: CustomInputTypes | string;
  rules?: FormRule;
  required?: boolean;
  options?: CustomInputOptions;
  [key: string]: any;
}

export interface FormulateFiled extends FormulateBaseFiled {
  key: string;
}

export type FormulateFullFields = {
  [key: string]: FormulateBaseFiled;
  $footer?: FormulateBaseFiled | FormulateFiled[]
}

export type FormulateFields = FormulateFullFields | FormulateFiled[]

export interface MapRules {
  (options: { type?: string, key: string, label: string }): FormRule[] | []
}

export interface FormulatePublicInputProps {
  vIf(formData: { [key: string]: CustomInputValue }): boolean | undefined
}

export type PartialInputProps = Partial<CustomInputProps & FormulatePublicInputProps>

export declare class EFormulate extends SimElementComponent {
  
}