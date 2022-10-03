import { VNodeChildren } from "vue"
import { VNode, VNodeData } from "vue/types/umd"
import { CascaderOption } from "element-ui/types/cascader-panel"
import { HandleRef } from "../../../composables/useComponentProps"
import { FormProps } from '../../form/src/formProps'
import { CustomInputValue } from "../../../../types/_common"
import { ElFormRule } from "../../../../types/_element-ui"
import { SelectOptions, SelectProps } from "../../select/src/selectProps"
import { RadioGroupOptions, RadioGroupProps } from "../../radio-group/src/radioGroupProps"
import { CheckboxGroupOptions, CheckboxGroupProps } from "../../checkbox-group/src/checkboxGroupProps"
import { FormItemProps, FormItemType } from "../../form-item/src/formItemProps"
import { InputProps } from "../../input/src/inputProps"
import { InputNumberProps } from "../../input-number/src/inputNumberProps"
import { DatePickerProps, TimePickerProps, TimeSelectProps } from "../../date-picker/src/dateProps"
import { SliderProps } from "../../slider/src/sliderProps"
import { SwitchProps } from "../../switch/src/switchProps"
import { CascaderProps } from "../../cascader/src/cascaderProps"
import { UploadProps } from "../../upload/src/uploadProps"

export interface FormulateFields {
  [key: string]: FormulateField
}

export type FormulateField =  {
  label?: string;
  labelWidth?: string;
  required?: boolean;
  rules?: ElFormRule[];
  error?: string;
  showMessage?: boolean;
  inlineMessage?: boolean;
  itemPrefix?: () => VNodeChildren;
  itemSuffix?: () => VNodeChildren;

  // custom input
  type?: FormItemType;
  ref?: HandleRef;
  default?: CustomInputValue;
  vIf?(formData: { [key: string]: CustomInputValue }): boolean | undefined;
  options?: SelectOptions | RadioGroupOptions | CheckboxGroupOptions | CascaderOption[];
  children?: () => VNode[];
  scopedSlots?: VNodeData['scopedSlots'];
  extra?: string | (() => VNode[]);
  disabled?: boolean;

  // --- Upload
  tips: string[];
  tipClass: string;
  tipItemClass: string;
  button: ButtonProps
  
  // ?...
  placeholder: string;
  name: string;
  autofocus: string;
  minlength: string;
  maxlength: string;

  $render: (() => VNode) | undefined;
  key: string;
} & FormItemProps & CustomInputProps

export type FormRule = {
  required?: boolean;
  message: string;
  pattern?: RegExp | string;
  trigger?: string;
  min?: number;
  max?: number;
  [key: string]: any;
}

export type FormRules = {
  [key: string]: FormRule[]
}

export type MapFieldsItem = {
  key: string;
} & FormulateField

export interface FormData {
  [key: string]: CustomInputValue
}

export interface MapRules {
  (options: { type?: string, key: string, label: string }): ElFormRule[] | []
}

export type CustomInputProps = RadioGroupProps | CheckboxGroupProps | InputProps | InputNumberProps | SelectProps | CascaderProps | SwitchProps | SliderProps | DatePickerProps | TimePickerProps | TimeSelectProps | UploadProps

export type ButtonProps = {
  hue?: string;
  size?: string;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  autofocus?: string;
  icon?: string;
  text?: string;
  onClick?: (event: MouseEvent) => void;
}