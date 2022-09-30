import { CascaderOption } from "element-ui/types/cascader-panel";
import { ElementUIComponentSize } from "element-ui/types/component";
import { ElFormItem } from "element-ui/types/form-item";
import { TimeSelectOptions } from "element-ui/types/time-select";
import { TimePickerOptions } from "element-ui/types/time-picker";
import { DatePickerOptions } from "element-ui/types/date-picker";
import { ObjectLike } from "./_common";
import { useFormItem } from '../src/components/form-item'
import { CheckboxGroupOptions } from "../src/components/checkbox-group/src/checkboxGroupProps";
import { RadioGroupOptions } from "../src/components/radio-group/src/radioGroupProps";
import { SelectOptionGroup, SelectOptions } from "../src/components/select/src/selectProps";
import { FormItemExtendsProps } from "../src/components/form-item/src/formItemProps";

export declare class EFormItem extends ElFormItem {
  type: string;
  value: string | number | Array<unknown> | boolean | Date;
  clearable: boolean;
  size: ElementUIComponentSize;
  disabled: boolean;
  readonly: boolean;
  showPassword: boolean;
  showWordLimit: boolean;
  validateEvent: boolean;
  options: RadioGroupOptions | CheckboxGroupOptions | SelectOptions | CascaderOption[];
  action: string;
  headers: ObjectLike;
  multiple: boolean;
  fileList: ObjectLike[];
  accept: string;
  format: string;
  pickerOptions: DatePickerOptions | TimePickerOptions | TimeSelectOptions;
  exclude: string | number | RegExp;
  optionGroups: SelectOptionGroup;
  withBorder: boolean;
  withButton: boolean;
  extends: FormItemExtendsProps
}
export declare type useFormItem = typeof useFormItem
