import { SetupContext } from "vue"
import { FormItemProps } from "./formItemProps";
import { useRadioGroup } from "../../radio-group";
import { useCheckboxGroup } from "../../checkbox-group";
import { useInput } from "../../input";
import { useInputNumber } from "../../input-number";
import { useSelect } from "../../select";

import { empty } from "../../../shared/_commonProps";
import { withDefaultProps } from "../../../utils/withDefaultProps";
import { useCascader } from "../../cascader";
import { useSwitch } from "src/components/switch";

export function useCustomInput<T extends FormItemProps>(props: T, context: SetupContext<{}>) {
  switch(props.type) {
    case 'radio':
    case 'radio-group':
      return useRadioGroup<T>(props, context, {
        handleProps: (_props, globalProps) => () => ({
          value: props.value,
          disabled: props.disabled,
          options: props.options,
          size: props.size || globalProps?.size,

          withBorder: !!(props.withBorder || globalProps?.withBorder),
          withButton: !!(props.withButton || globalProps?.withButton),

          ...withDefaultProps(props.extends, globalProps, ['textColor', 'fill'])
        })
      })

    case 'checkbox':
    case 'checkbox-group':
      return useCheckboxGroup<T>(props, context, {
        handleProps: (_props, globalProps) => () => ({
          value: props.value,
          disabled: props.disabled,
          options: props.options,
          size: props.size || globalProps?.size,

          withBorder: !!(props.withBorder || globalProps?.withBorder),
          withButton: !!(props.withButton || globalProps?.withButton),

          ...withDefaultProps(props.extends, globalProps, ['min', 'max', 'textColor', 'fill']),
        })
      })
    
    case 'text':
    case 'input':
      return useInput<T>(props, context, {
        handleProps: (_props, globalProps?) => () => ({
          value: props.value,
          validateEvent: props.validateEvent,
          label: props.label,
          showPassword: props.showPassword,
          type: props.type,
          disabled: props.disabled,
          readonly: props.readonly,
          resize: props.extends.resize,
          form: props.extends.form,
          autocomplete: props.extends.autocomplete,
          tabindex: props.extends.tabindex,

          // global
          ...withDefaultProps(props, globalProps, ['clearable', 'showWordLimit', 'size']),
          ...withDefaultProps(props.extends, globalProps, ['autosize', 'suffixIcon', 'prefixIcon'])
        }),
        handleAttrs: (_props, globalProps) => () => ({
          placeholder: context.attrs.placeholder,
          name: context.attrs.name,
          step: context.attrs.step,
          autofocus: context.attrs.autofocus,
          rows: context.attrs.rows,
          minlength: context.attrs.minlength,
          max: context.attrs.max,
          min: context.attrs.min,
          ...withDefaultProps(context.attrs, globalProps, ['maxlength'])
        })
      })

    case 'number':
    case 'input-number':
      return useInputNumber(props, context, {
        handleProps: (_props, globalProps) => () => ({
          value: props.value,
          disabled: props.disabled,
          label: props.label,
          name: context.attrs.name,
          placeholder: context.attrs.placeholder,
          ...withDefaultProps(props, globalProps, ['size']),
          ...withDefaultProps(props.extends, globalProps, ['min', 'max', 'step', 'stepStrictly', 'precision', 'controls', 'controlsPosition'])
        })
      })

    case 'select':
      return useSelect(props, context, {
        handleProps: (_props, globalProps) => () => ({
          value: props.value,
          disabled: props.disabled,
          autocomplete: props.extends.autocomplete,
          automaticDropdown: props.extends.automaticDropdown,
          filterable: props.extends.filterable,
          allowCreate: props.extends.allowCreate,
          loading: props.extends.loading,
          remote: props.extends.remote,
          loadingText: props.extends.loadingText,
          noMatchText: props.extends.noMatchText,
          noDataText: props.extends.noDataText,
          remoteMethod: props.extends.remoteMethod,
          filterMethod: props.extends.filterMethod,
          defaultFirstOption: props.extends.defaultFirstOption,
          reserveKeyword: props.extends.reserveKeyword,
          collapseTags: props.extends.collapseTags,
          id: props.extends.id,

          name: context.attrs.name,
          placeholder: context.attrs.placeholder,
          
          // global
          ...withDefaultProps(props, globalProps, ['size', 'clearable']),
          ...withDefaultProps(props.extends, globalProps, ['valueKey', 'multiple', 'multipleLimit', 'popperClass', 'popperAppendToBody'])
        })
      })
    
    case 'cascader':
      return useCascader<T>(props, context, {
        handleProps(_props, globalProps) {
          const globalPropNames = ['options', 'size', 'clearable']
          const globalExtendsNames = ['props', 'popperClass', 'separator', 'showAllLevels', 'collapseTags']

          return () => ({
            value: props.value,
            disabled: props.disabled,
            filterable: props.extends.filterable,
            filterMethod: props.extends.filterMethod,
            debounce: props.extends.debounce,
            beforeFilter: props.extends.beforeFilter,
            placeholder: context.attrs.placeholder,
  
            ...withDefaultProps(props, globalProps, globalPropNames),
            ...withDefaultProps(props.extends, globalProps, globalExtendsNames)
          })
        }
      })
    
    case 'switch':
      return useSwitch<T>(props, context, {
        handleProps(_props, globalProps) {
          const globalPropNames = ['validateEvent']
          const globalExtendsNames = ['width', 'activeIconClass', 'inactiveIconClass', 'activeText', 'inactiveText', 'activeValue', 'inactiveValue', 'activeColor', 'inactiveColor']
          return () => ({
            value: props.value,
            disabled: props.disabled,
            validateEvent: props.validateEvent,
            name: context.attrs.name,

            ...withDefaultProps(props, globalProps, globalPropNames),
            ...withDefaultProps(props.extends, globalProps, globalExtendsNames)
          })
        }
      })
  }
}