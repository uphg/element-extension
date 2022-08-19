import { SimElementComponent } from './component'
import { FormData, FormRule } from './form';
import { CustomInputTypes, CustomInputValue, CustomInputOptions } from './input'
import { CustomInputProps } from '../shared/customInputProps'
import { ElementUIComponentSize } from 'element-ui/types/component';
import { FormItemLabelPosition, ValidateCallback, ValidateFieldCallback } from 'element-ui/types/form';
import { ScopedSlot, VNodeChildren } from 'vue/types/vnode';

export interface FormulateField extends CustomInputProps {
  label?: string;
  key?: string;
  type?: CustomInputTypes | string;
  rules?: FormRule;
  required?: boolean;
  options?: CustomInputOptions;
  vIf?(formData: { [key: string]: CustomInputValue }): boolean | undefined;
  [key: string]: VNodeChildren;
}


export type FormulateFields = {
  [key: string]: FormulateFiled;
  $footer?: FormulateFiled | FormulateFiled[]
}

export interface MapRules {
  (options: { type?: string, key: string, label: string }): FormRule[] | []
}


export type PartialInputProps = Partial<FormulateInputProps>

export declare class EFormulate extends SimElementComponent {
  
}