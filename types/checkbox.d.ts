import { ElCheckboxGroup } from "element-ui/types/checkbox-group";
import { CheckboxGroupOptions } from '../src/components/checkbox-group/src/checkboxGroupProps'
import { useCheckboxGroup } from '../src/components/checkbox-group'

export declare class ECheckboxGroup extends ElCheckboxGroup {
  withBorder: boolean;
  withButton: boolean;
  options: CheckboxGroupOptions
}
export declare type useCheckboxGroup = typeof useCheckboxGroup
