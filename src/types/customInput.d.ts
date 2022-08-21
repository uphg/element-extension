import { VNode, VNodeChildren, ScopedSlot } from "vue";
// import { ScopedSlot } from "vue/types/vnode";

export type CustomInputTypes = 'button' | 'radio' | 'checkbox' | 'text' | 'password' | 'textarea' | 'number' | 'input-number' | 'select' | 'cascader' | 'date' | 'date-picker' | 'year' | 'month' | 'dates' | 'week' | 'daterange' | 'monthrange' | 'datetime' | 'datetimerange' | 'time' | 'time-select' | 'time-picker' | 'switch' | 'slider' | 'file' | 'upload'

export type CustomInputValue = string | boolean | number | Date | Date[] | string[]

export type CustomInputOptions = {
  label?: string;
  key?: string | number | symbol;
  value?: CustomInputValue;
  disabled?: boolean;
  name?: string;
  children?: (VNode | VNodeChildren | ScopedSlot)[]
  options?: CustomInputOptions[]
}

type InputComponents = Vue | HTMLElement | ElButton | ElInput | ElSelect | ElCalendar | ElOption | ElRadioGroup | ElRadio | ElCheckboxGroup | ElCheckbox | ElInputNumber | ElSwitch | ElSlider | ElTimeSelect | ElDatePicker | ElUpload
