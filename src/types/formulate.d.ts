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

export type FormulateFullFileds = {
  [key: string]: FormulateBaseFiled;
  $footer?: FormulateBaseFiled | FormulateFiled[]
}

export type FormulateFileds = FormulateFullFileds | FormulateFiled[]

export interface MapRules {
  (options: { type?: string, key: string, label: string }): FormRule | []
}

export interface FormulatePublicInputProps {
  vIf(formData: { [key: string]: CustomInputValue }): boolean | undefined
}

export type PartialInputProps = Partial<CustomInputProps & FormulatePublicInputProps>

export declare class SFormulate extends SimElementComponent {
  /** Data of form component */
  model: object

  /** Validation rules of form */
  rules: object

  /** Whether the form is inline */
  inline: boolean

  /** Whether the form is disabled */
  disabled: boolean

  /** Position of label */
  labelPosition: FormItemLabelPosition

  /** Width of label, and all form items will inherit from Form */
  labelWidth: string

  /** Suffix of the label */
  labelSuffix: string

  /** Whether to show the error message */
  showMessage: boolean

  /** Whether to display the error message inline with the form item */
  inlineMessage: boolean

  /** Whether to display an icon indicating the validation result */
  statusIcon: boolean

  /** Whether to trigger validation when the `rules` prop is changed */
  validateOnRuleChange: boolean

  /** Controls the size of components in this form */
  size: ElementUIComponentSize

  setValues (formData: FormData): void;

  getValues (): FormData;

  submit (callback: (formData: FormData, options: { valid: boolean, errors: object }) => void): void;

  /**
   * Validate the whole form
   *
   * @param callback A callback to tell the validation result
   */
  validate (callback: ValidateCallback): void
  validate (): Promise<boolean>
  /**
   * Validate certain form items
   *
   * @param props The property of `model` or array of prop which is going to validate
   * @param callback A callback to tell the field validation result
   */
  validateField (props: string | string[], callback?: ValidateFieldCallback): void

  /** reset all the fields and remove validation result */
  resetFields (): void

  /** clear validation message for certain fields */
  clearValidate (props?: string | string[]): void
}