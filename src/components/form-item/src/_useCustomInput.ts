import { SetupContext } from "vue"
import { FormItemProps } from "./formItemProps";
import { useRadioGroup } from "../../radio-group";
import { useCheckboxGroup } from "../../checkbox-group";

export function useCustomInput<T extends FormItemProps>(props: T, context: SetupContext<{}>) {
  switch(props.type) {
    case 'radio':
      return useRadioGroup<T>(props, context, {
        handleProps: (props, globalProps) => () => ({
          value: props.value,
          disabled: props.disabled,
          options: props.options,
          size: props.size || globalProps?.size,
          textColor: props.textColor || globalProps?.textColor,
          fill: props.fill || globalProps?.fill,
          withBorder: !!(props.withBorder || globalProps?.withBorder),
          withButton: !!(props.withButton || globalProps?.withButton),
        })
      })
    case 'checkbox':
      return useCheckboxGroup<T>(props, context, {
        handleProps: (props, globalProps) => () => ({
          // value: props.value,
          // disabled: props.disabled,
          // options: props.options,
          // size: props.size || globalProps?.size,
          // textColor: props.textColor || globalProps?.textColor,
          // fill: props.fill || globalProps?.fill,
          // withBorder: !!(props.withBorder || globalProps?.withBorder),
          // withButton: !!(props.withButton || globalProps?.withButton),
        })
      })
  }
}