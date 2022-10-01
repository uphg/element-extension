import { SetupContext } from "vue"
import { VNode } from "vue/types/umd";
import { FormItemProps } from "./formItemProps";
import { useRadioGroup } from "../../radio-group";
import { useCheckboxGroup } from "../../checkbox-group";
import { useInput } from "../../input";
import { useInputNumber } from "../../input-number";
import { useSelect } from "../../select";
import { useCascader } from "../../cascader";
import { useSwitch } from "../../switch";
import { useSlider } from "../../slider";
import { useDatePicker } from "../../date-picker";
import { useUpload } from "../../upload";
import { pick, withDefaultProps } from "../../../utils";
import { empty } from "../../../shared/commonProps";
import { ObjectLike } from "../../../../types/_common";

const globalDatePropNames = ['pickerOptions', 'validateEvent', 'size', 'clearable', 'format']
const globalDateExtendNames = ['editable', 'startPlaceholder', 'endPlaceholder', 'align', 'rangeSeparator', 'defaultValue', 'defaultTime', 'valueFormat', 'unlinkPanels', 'popperClass', 'prefixIcon', 'clearIcon']
const globalChoosePropNames = ['size']
const globalChooseExtendNames = ['textColor', 'fill']

type CustomInputReturn = {
  render: () => VNode;
  expose?: ObjectLike;
}

export function useCustomInput<T extends FormItemProps>(props: T, context: SetupContext<{}>): CustomInputReturn | undefined {
  switch(props.type) {
    case 'radio':
    case 'radio-group': {
      return useRadioGroup<T>(props, context, {
        handleProps: (_props, globalProps) => () => ({
          value: props.value,
          disabled: props.disabled,
          options: props.options,

          ...withDefaultProps(props, globalProps, globalChoosePropNames),
          ...withDefaultProps(props.extends, globalProps, globalChooseExtendNames)
        })
      })
    }

    case 'checkbox':
    case 'checkbox-group': {
      return useCheckboxGroup<T>(props, context, {
        handleProps: (_props, globalProps) => () => ({
          value: props.value,
          disabled: props.disabled,
          options: props.options,

          ...withDefaultProps(props, globalProps, globalChoosePropNames),
          ...withDefaultProps(props.extends, globalProps, globalChooseExtendNames.concat(['min', 'max'])),
        })
      })
    }

    case 'text':
    case 'password':
    case 'textarea':
    case 'input': {
      return useInput<T>(props, context, {
        handleProps(_props, globalProps?) {
          return () => ({
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
          })
        },
        handleAttrs(_props, globalProps, { attrNames }) {
          return () => ({
            ...pick(context.attrs, attrNames),
            ...withDefaultProps(context.attrs, globalProps, ['maxlength'])
          })
        }
      })
    }

    case 'number':
    case 'input-number': {
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
    }

    case 'select': {
      const extendPropNames = ['autocomplete', 'automaticDropdown', 'filterable', 'allowCreate', 'loading', 'remote', 'loadingText', 'noMatchText', 'noDataText', 'remoteMethod', 'filterMethod', 'defaultFirstOption', 'reserveKeyword', 'collapseTags', 'id']
      return useSelect(props, context, {
        handleProps: (_props, globalProps) => () => ({
          value: props.value,
          disabled: props.disabled,
          ...pick(props.extends, extendPropNames),          
          name: context.attrs.name,
          placeholder: context.attrs.placeholder,
          
          // global
          ...withDefaultProps(props, globalProps, ['size', 'clearable']),
          ...withDefaultProps(props.extends, globalProps, ['valueKey', 'multiple', 'multipleLimit', 'popperClass', 'popperAppendToBody'])
        })
      })
    }

    case 'cascader': {
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
    }

    case 'switch': {
      return useSwitch<T>(props, context, {
        handleProps(_props, globalProps) {
          const globalPropNames = ['validateEvent']
          const globalExtendsNames = ['width', 'activeIconClass', 'inactiveIconClass', 'activeText', 'inactiveText', 'activeValue', 'inactiveValue', 'activeColor', 'inactiveColor']
          return () => ({
            value: props.value,
            disabled: props.disabled,
            name: context.attrs.name,
            ...withDefaultProps(props, globalProps, globalPropNames),
            ...withDefaultProps(props.extends, globalProps, globalExtendsNames)
          })
        }
      })
    }

    case 'slider': {
      return useSlider(props, context, {
        handleProps(_props, globalProps) {
          const globalPropNames = ['min', 'max', 'step', 'showInput', 'showInputControls', 'inputSize', 'showStops', 'showTooltip', 'formatTooltip', 'range', 'vertical', 'height', 'label', 'debounce', 'tooltipClass', 'marks']
          return () => ({
            value: props.value || 0,
            disabled: props.disabled,
            ...withDefaultProps(props.extends, globalProps, globalPropNames)
          })
        }
      })
    }

    case 'date':
    case 'date-picker': {
      return useDatePicker<T>(props, context, {
        type: 1,
        handleProps(_props, globalProps) {
          return () => ({
            type: props.type,
            value: props.value,
            disabled: props.disabled,
            readonly: props.readonly,
            name: context.attrs.name,
            
            // global props
            ...withDefaultProps(props, globalProps, globalDatePropNames),
            ...withDefaultProps(props.extends, globalProps, globalDateExtendNames),
            placeholder: context.attrs.placeholder || globalProps?.placeholder,
          })
        }
      })
    }

    case 'time':
    case 'time-picker': {
      return useDatePicker<T>(props, context, {
        type: 2,
        handleProps(_props, globalProps) {
          return () => ({
            value: props.value,
            disabled: props.disabled,
            readonly: props.readonly,
            name: context.attrs.name,

            // global props
            ...withDefaultProps(props, globalProps, globalDatePropNames),
            ...withDefaultProps(props.extends, globalProps, globalDateExtendNames),
            placeholder: context.attrs.placeholder || globalProps?.placeholder,
          })
        }
      })
    }
    
    case 'time-select': {
      return useDatePicker<T>(props, context, {
        type: 3,
        handleProps(_props, globalProps) {
          return () => ({
            type: props.type,
            value: props.value,
            disabled: props.disabled,
            readonly: props.readonly,
            name: context.attrs.name,

            // global props
            ...withDefaultProps(props, globalProps, globalDatePropNames),
            ...withDefaultProps(props.extends, globalProps, globalDateExtendNames),
            placeholder: context.attrs.placeholder || globalProps?.placeholder,
          })
        }
      })
    }
    
    case 'file':
    case 'upload': {
      const globalPropNames = ['withCredentials', 'drag', 'beforeUpload', 'beforeRemove', 'limit', 'onRemove', 'onChange', 'onPreview', 'onSuccess', 'onProgress', 'onError', 'onExceed', 'action', 'headers', 'multiple', 'data', 'drag', 'listType', 'autoUpload', 'httpRequest']
      return useUpload<T>(props, context, {
        handleProps(_props, globalProps) {
          return () => ({
            type: 'select',
            fileList: props.fileList,
            disabled: props.disabled,
            dragger: props.extends.dragger,
            name: context.attrs.name,

            // global props
            ...withDefaultProps(props.extends, globalProps, globalPropNames),
            accept: props.accept || globalProps?.accept || empty,
          })
        }
      })
    }
  }
}