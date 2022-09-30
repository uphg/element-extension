import { ElSelect } from "element-ui/types/select";
import { SelectOptions, SelectOptionGroup } from '../src/components/select/src/selectProps'
import { useSelect } from '../src/components/select'

export declare class ESelect extends ElSelect {
  options: SelectOptions;
  optionGroups: SelectOptionGroup;
}
export declare type useSelect = typeof useSelect
