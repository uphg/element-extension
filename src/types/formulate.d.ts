import { SimElementComponent } from './component'
import { FormData, FormRule } from './form';
import { CustomInputTypes, CustomInputValue, CustomInputOptions } from './customInput'
import { CustomInputProps } from '../shared/customInputProps'
import { ElementUIComponentSize } from 'element-ui/types/component';
import { FormItemLabelPosition, ValidateCallback, ValidateFieldCallback } from 'element-ui/types/form';
import { ScopedSlot, VNodeChildren } from 'vue/types/vnode';
import { ElFormItemProps } from '../shared/elFormItemProps';

// export type FormulateField = {
//   label: string;
//   type?: CustomInputTypes;
//   rules?: FormRule[];
//   required?: boolean;
//   options?: CustomInputOptions;
//   vIf?(formData: { [key: string]: CustomInputValue }): boolean | undefined;
//   itemPrefix?: VNodeChildren,
//   itemSuffix?: VNodeChildren
// } & ElFormItemProps & CustomInputProps

// export interface FormulateFields {
//   [key: string]: FormulateField
// }

// export type FormulateInputProps = {}

// export type PartialInputProps = Partial<FormulateInputProps>

export declare class EFormulate extends SimElementComponent {
  
}