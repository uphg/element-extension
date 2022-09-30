import { ElRadioGroup } from "element-ui/types/radio-group";
import { useRadioGroup } from '../src/components/radio-group'
import { RadioGroupOptions } from '../src/components/radio-group/src/radioGroupProps'

export declare class ERadioGroup extends ElRadioGroup {
  withBorder: boolean;
  withButton: boolean;
  options: RadioGroupOptions
}
export declare type useRadioGroup = typeof useRadioGroup