import { VNodeChildren } from "vue"
import { ScopedSlot, VNode } from "vue/types/vnode"

export type ObjectLike = {
  [key: string]: ObjectLike | unknown | any
}

export type CustomInputTypes = 'button' | 'radio' | 'checkbox' | 'text' | 'password' | 'textarea' | 'number' | 'input-number' | 'select' | 'cascader' | 'date' | 'date-picker' | 'year' | 'month' | 'dates' | 'week' | 'daterange' | 'monthrange' | 'datetime' | 'datetimerange' | 'time' | 'time-select' | 'time-picker' | 'switch' | 'slider' | 'file' | 'upload'

export type CustomInputValue = string | boolean | number | Date | Date[] | string[]

export type CustomOptions = {
  label?: string;
  key?: string | number | symbol;
  value?: CustomInputValue;
  disabled?: boolean;
  name?: string;
  children?: (VNode | VNodeChildren | ScopedSlot)[]
  options?: CustomOptions[]
}
