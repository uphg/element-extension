export type InputTypes = 'button' | 'radio' | 'checkbox' | 'text' | 'password' | 'textarea' | 'number' | 'select' | 'cascader' | 'date' | 'year' | 'month' | 'dates' | 'week' | 'daterange' | 'monthrange' | 'datetime' | 'datetimerange' | 'time' | 'switch' | 'slider' | 'file' | 'upload'

export type InputValue = string | boolean | number | Date | Date[] | string[]

export type InputOptions = {
  value: InputValue;
  label: string;
  disabled?: boolean;
}
