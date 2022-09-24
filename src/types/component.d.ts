import { VueConstructor } from "vue"

import { CascaderProps, GlobalCascaderProps } from "../components/cascader/src/cascaderProps"
import { CheckboxGroupProps, GlobalCheckboxGroupProps } from "../components/checkbox-group/src/checkboxGroupProps"
import { DatePickerProps, PublicDateProps, TimePickerProps, TimeSelectProps } from "../components/date-picker/src/dateProps"
import { GlobalInputNumberProps, InputNumberProps } from "../components/input-number/src/inputNumberProps"
import { GlobalInputProps, InputProps } from "../components/input/src/inputProps"
import { GlobalRadioGroupProps, RadioGroupProps } from "../components/radio-group/src/radioGroupProps"
import { GlobalSelectProps, SelectProps } from "../components/select/src/selectProps"
import { GlobalSliderProps, SliderProps } from "../components/slider/src/sliderProps"
import { GlobalSwitchProps, SwitchProps } from "../components/switch/src/switchProps"
import { GlobalUploadProps, UploadProps } from "../components/upload/src/uploadProps"

export declare type ElementPartComponent<T> = {
  install: (Vue: VueConstructor) => void
} & T

export type ComponentProps = RadioGroupProps | CheckboxGroupProps | InputProps | InputNumberProps | SelectProps | CascaderProps | SwitchProps | SliderProps | DatePickerProps | TimePickerProps | TimeSelectProps | UploadProps
export type ComponentGlobalProps = GlobalRadioGroupProps | GlobalCheckboxGroupProps | GlobalInputProps | GlobalInputNumberProps | GlobalSelectProps | GlobalCascaderProps | GlobalSwitchProps | GlobalSliderProps | GlobalDateProps | GlobalUploadProps