import { HandleRef } from "../../../composables/useComponentProps"
import { VNodeChildren } from "vue"
import { VNode, VNodeData } from "vue/types/umd"
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

export type FormulateField =  {
  label: string;
  default: CustomInputValue;
  type?: FormItemType;
  rules?: ElFormRule[];
  required?: boolean;
  options?: SelectOptions | RadioGroupOptions | CheckboxGroupOptions;
  vIf?(formData: { [key: string]: CustomInputValue }): boolean | undefined;
  itemPrefix?: VNodeChildren;
  itemSuffix?: VNodeChildren;
  ref?: HandleRef;
  children: VNode[];
  $render: (() => VNode) | undefined;
  extra: string | VNode;
  tips: string[];
  key: string;
  placeholder: string;
  name: string;
  autofocus: string;
  rows: string;
  minlength: string;
  maxlength: string;
  scopedSlots: VNodeData['scopedSlots'];
  tipClass: string;
  tipItemClass: string;
  button: ButtonProps
  onClick: (event: MouseEvent) => void
} & FormProps & FormItemProps & CustomInputProps

export interface FormulateFields {
  [key: string]: FormulateField
}