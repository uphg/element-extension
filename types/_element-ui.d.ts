import { ElInputNumber as _ElInputNumber } from "element-ui/types/input-number"
import { ElSwitch as _ElSwitch } from "element-ui/types/switch"
import { ElUpload as _ElUpload } from 'element-ui/types/upload'
import { ElCalendar as _ElCalendar } from "element-ui/types/calendar"
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