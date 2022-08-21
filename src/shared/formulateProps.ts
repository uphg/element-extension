import { ExtractPropTypes, PropType, VNodeChildren } from "vue"
import { elFormProps } from "./elFormProps"
import { VNode, VNodeData } from "vue/types/umd"
import { ElFormItemProps } from "./elFormItemProps"
import { CustomInputProps } from "./customInputProps"
import { CustomInputOptions, CustomInputTypes, CustomInputValue } from "../types/customInput"
import { FormRule } from "../types/form"

export interface MapRules {
  (options: { type?: string, key: string, label: string }): FormRule[] | []
}

export type FormulateExpandsProps = ExtractPropTypes<typeof formulateExpandsProps>

export type FormulateField =  {
  label: string;
  type?: CustomInputTypes;
  rules?: FormRule[];
  required?: boolean;
  options?: CustomInputOptions;
  vIf?(formData: { [key: string]: CustomInputValue }): boolean | undefined;
  itemPrefix?: VNodeChildren;
  itemSuffix?: VNodeChildren;
  ref: string;
  children: VNode[];
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
  button: {
    hue: string;
    size: string;
    plain: string;
    round: string;
    circle: string;
    icon: string;
    text: string;
  }
  onClick: (event: MouseEvent) => void
} & ElFormItemProps & CustomInputProps

export interface FormulateFields {
  [key: string]: FormulateField
}

export type FormulateProps = ExtractPropTypes<typeof formulateProps>

const formulateExpandsProps = {
  ...elFormProps,
  fields: {
    type: [Array, Object] as PropType<FormulateFields | FormulateFields[]>,
    default: () => ({})
  },
  withEnterNext: Boolean as PropType<boolean>, // 是否开启回车换行
  mapRules: Function as PropType<MapRules>, // 是否添加 map rules 函数，添加后自动开启验证，mapRules({ type, key, label })
}


export const formulateProps = {
  ...formulateExpandsProps,
  expands: {
    type: [Object] as PropType<FormulateExpandsProps>,
    default: () => ({})
  }
}
