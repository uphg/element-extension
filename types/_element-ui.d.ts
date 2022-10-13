import { ElInputNumber as _ElInputNumber } from "element-ui/types/input-number"
import { ElSwitch as _ElSwitch } from "element-ui/types/switch"
import { ElUpload as _ElUpload } from 'element-ui/types/upload'
import { ElCalendar as _ElCalendar } from "element-ui/types/calendar"
import { ElForm as _ElForm } from "element-ui/types/form"
import { ElFormItem as _ElFormItem } from "element-ui/types/form-item"
import { ObjectLike } from "./_common";

export declare class ElInputNumber extends _ElInputNumber {
  select(): void
}

export declare class ElSwitch extends _ElSwitch {
  focus(): void
}

export declare class ElUpload extends _ElUpload {
  uploadDisabled: boolean;
  uploadFiles: { [key: string]: any }[];
  handleRemove: (file: any, raw?: string) => void;
}

export declare class ElCalendar extends _ElCalendar {
  getCheckedNodes: (leafOnly: boolean) => ObjectLike
}

// --- Table
export interface RowCallbackParams {
  row: { [key: string]: any },
  rowIndex: number
}

// --- Form
export class ElForm extends _ElForm {
  fields: ObjectLike[]
}
export interface ElFormRule {
  required?: boolean;
  message: string;
  pattern?: RegExp | string;
  trigger?: string;
  min?: number;
  max?: number;
}

// --- FormItem
export class ElFormItem extends _ElFormItem {
  readonly validateMessage: string;
}