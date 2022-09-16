import { ElInputNumber as _ElInputNumber } from "element-ui/types/input-number"
import { ElSwitch as _ElSwitch } from "element-ui/types/input-number"
import { ElUpload as _ElUpload } from 'element-ui/types/upload'

class ElInputNumber extends _ElInputNumber {
  select(): void
}

class ElSwitch extends _ElSwitch {
  focus(): void
}

class ElUpload extends _ElUpload {
  uploadDisabled: boolean;
  uploadFiles: { [key: string]: any }[];
  handleRemove: (file: any, raw?: string) => void;
} 