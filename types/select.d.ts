import { ElSelect } from "element-ui/types/select";
import { CustomOptions } from "./customInput";

export declare class ESelect extends ElSelect {
  options: CustomOptions[];
  optionGroups: CustomOptions[]
}