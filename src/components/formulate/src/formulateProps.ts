import { SetRef } from "../../../composables/useComponentProps"
import { ExtractPropTypes, PropType, VNodeChildren } from "vue"
import { VNode, VNodeData } from "vue/types/umd"
import { elFormProps, ElFormItemProps, CustomInputProps } from "../../../shared/_commonProps"
import { CustomInputOptions, CustomInputTypes, CustomInputValue } from "../../../types/customInput"
import { FormRule } from "../../../types/form"

export interface MapRules {
  (options: { type?: string, key: string, label: string }): FormRule[] | []
}

export type FormulateDataProps = ExtractPropTypes<typeof formulateDataProps>

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
  type?: CustomInputTypes;
  rules?: FormRule[];
  required?: boolean;
  options?: CustomInputOptions;
  vIf?(formData: { [key: string]: CustomInputValue }): boolean | undefined;
  itemPrefix?: VNodeChildren;
  itemSuffix?: VNodeChildren;
  ref?: SetRef;
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
} & ElFormItemProps & CustomInputProps

export interface FormulateFields {
  [key: string]: FormulateField
}

export type FormulateProps = ExtractPropTypes<typeof formulateProps>

const formulateDataProps = {
  ...elFormProps,
  fields: {
    type: [Array, Object] as PropType<FormulateFields | FormulateFields[]>,
    default: () => ({})
  },
  gutter: Number as PropType<number>, // 多列布局的分栏间隔
  withEnterNext: Boolean as PropType<boolean>, // 是否开启回车换行
  mapRules: Function as PropType<MapRules>, // 是否添加 map rules 函数，添加后自动开启验证，mapRules({ type, key, label })
}

export const formulateProps = {
  ...formulateDataProps,
  data: [Object] as PropType<FormulateDataProps>
}
