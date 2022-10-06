import { VueConstructor } from "vue"
import { VNodeChildren } from "vue"
import { ScopedSlot, VNode } from "vue/types/vnode"
import { CascaderProps, GlobalCascaderProps } from "../src/components/cascader/src/cascaderProps"
import { CheckboxGroupProps, GlobalCheckboxGroupProps } from "../src/components/checkbox-group/src/checkboxGroupProps"
import { DatePickerProps, GlobalDateProps, TimePickerProps, TimeSelectProps } from "../src/components/date-picker/src/dateProps"
import { GlobalInputNumberProps, InputNumberProps } from "../src/components/input-number/src/inputNumberProps"
import { GlobalInputProps, InputProps } from "../src/components/input/src/inputProps"
import { GlobalRadioGroupProps, RadioGroupProps } from "../src/components/radio-group/src/radioGroupProps"
import { GlobalSelectProps, SelectProps } from "../src/components/select/src/selectProps"
import { GlobalSliderProps, SliderProps } from "../src/components/slider/src/sliderProps"
import { GlobalSwitchProps, SwitchProps } from "../src/components/switch/src/switchProps"
import { GlobalUploadProps, UploadProps } from "../src/components/upload/src/uploadProps"

export type ObjectLike = {
  [key: string]: ObjectLike | any
}

export type Fn = (...args: unknown[]) => void

export type CustomInputValue = string | boolean | number | Date | Date[] | string[]

export type ComponentProps = RadioGroupProps | CheckboxGroupProps | InputProps | InputNumberProps | SelectProps | CascaderProps | SwitchProps | SliderProps | DatePickerProps | TimePickerProps | TimeSelectProps | UploadProps
export type ComponentGlobalProps = GlobalRadioGroupProps | GlobalCheckboxGroupProps | GlobalInputProps | GlobalInputNumberProps | GlobalSelectProps | GlobalCascaderProps | GlobalSwitchProps | GlobalSliderProps | GlobalDateProps | GlobalUploadProps
