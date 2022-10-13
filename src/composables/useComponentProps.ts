import { SetupContext, VNodeChildren, VNodeData } from "vue";
import { ConfigPropertyName } from "../shared/configPropertyMap";
import { useGlobalProps } from "./useGlobalProps"
import { ObjectLike } from "../../types/_common";
import { pick, withDefaultProps } from "../utils";
import { ElInputNumber, ElSwitch, ElUpload, ElCalendar } from "../../types/_element-ui";
import { ElInput } from "element-ui/types/input";
import { ElSelect } from "element-ui/types/select";
import { ElCheckboxGroup } from "element-ui/types/checkbox-group";
import { ElRadioGroup } from "element-ui/types/radio-group";
import { ElSlider } from "element-ui/types/slider";
import { ElTimeSelect } from "element-ui/types/time-select";
import { ElTimePicker } from "element-ui/types/time-picker";
import { ElDatePicker } from "element-ui/types/date-picker";
import { VNode } from "vue/types/umd";

type ComponentPropsOptions<Props, GlobalProps> = {
  propNames: string[];
  globalPropNames: string[];
  handleProps?: HandleProps<Partial<Props>, GlobalProps>
}

export type UseComponentParamsOptions<Props, GlobalProps> = {
  status?: 0 | 1;
  on?: VNodeData['on'];
  renderChildren?: () => VNodeChildren | VNode;
  handleRef?: HandleRef;
  handleProps?: HandleProps<Props, GlobalProps>,
  handleScopedSlots?: HandleScopedSlots,
}

export interface HandleProps<Props, GlobalProps> {
  (props: Props, globalProps: GlobalProps | undefined, _options: { propNames: string[], globalPropNames: string[]}): () => Props
}

export interface HandleRef {
  (el: ElRadioGroup | ElCheckboxGroup | ElInput | ElInputNumber | ElSelect | ElCalendar | ElSwitch | ElSlider | ElTimeSelect | ElTimePicker | ElDatePicker | ElUpload): void
}

export interface HandleScopedSlots {
  (slots: SetupContext['slots'] | undefined): VNodeData['scopedSlots']
}

export function useComponentProps<Props extends ObjectLike, GlobalProps extends ObjectLike>(
  props: Props,
  configPropertyName: ConfigPropertyName,
  options: ComponentPropsOptions<Props, GlobalProps>
) {
  const { propNames, globalPropNames, handleProps } = options || {}
  const globalProps = useGlobalProps<GlobalProps>(configPropertyName)

  const createProps = typeof handleProps === 'function'
    ? handleProps(props, globalProps, { propNames, globalPropNames })
    : () => ({ ...pick(props, propNames), ...withDefaultProps(props, globalProps, globalPropNames) }) as (Props | GlobalProps)
  return { createProps, globalProps }
}