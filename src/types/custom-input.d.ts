import { VNode } from "vue";

export type CustomInputTypes = 'button' | 'radio' | 'checkbox' | 'text' | 'password' | 'textarea' | 'number' | 'select' | 'cascader' | 'date' | 'year' | 'month' | 'dates' | 'week' | 'daterange' | 'monthrange' | 'datetime' | 'datetimerange' | 'time' | 'switch' | 'slider' | 'file' | 'upload'

export type CustomInputValue = string | boolean | number | Date | Date[] | string[]

export type CustomInputOptions = {
  value: CustomInputValue;
  label: string;
  disabled?: boolean;
  name?: string;
  children?: VNode[]
}

type InputComponents = Vue | HTMLElement | ElButton | ElInput | ElSelect | ElCalendar | ElOption | ElRadioGroup | ElRadio | ElCheckboxGroup | ElCheckbox | ElInputNumber | ElSwitch | ElSlider | ElTimeSelect | ElDatePicker | ElUpload
