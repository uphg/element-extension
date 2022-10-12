import { SetupContext } from "vue"
import { VNode } from "vue/types/umd";
import { FormItemProps, FormItemType } from "./formItemProps";
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

const globalDateAttrNames = ['id', 'name', 'placeholder']
const globalDatePropNames = ['pickerOptions', 'validateEvent', 'size', 'clearable', 'format']
const globalDateExtendNames = ['editable', 'startPlaceholder', 'endPlaceholder', 'align', 'rangeSeparator', 'defaultValue', 'defaultTime', 'valueFormat', 'unlinkPanels', 'popperClass', 'prefixIcon', 'clearIcon', 'appendToBody', 'offset', 'boundariesPadding', 'arrowOffset', 'placement', 'transformOrigin']

const globalChoosePropNames = ['size']
const globalChooseExtendNames = ['textColor', 'fill']

type CustomInputReturn = {
  render: () => VNode;
  expose?: ObjectLike;
}

export function useCustomInput<T extends FormItemProps>(props: T, _options: { context: SetupContext<{}>, type: FormItemType }): CustomInputReturn | undefined {
  const { context, type } = _options
  switch(type) {
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
            disabled: props.disabled,
            readonly: props.readonly,

            // global
            ...withDefaultProps(props, globalProps, ['type', 'label', 'showPassword', 'validateEvent',  'clearable', 'showWordLimit', 'size']),
            ...withDefaultProps(props.extends, globalProps, ['resize', 'form', 'tabindex', 'autocomplete', 'autosize', 'suffixIcon', 'prefixIcon'])
          })
        },
        handleAttrs(_props, globalProps, { attrNames, globalAttrNames }) {
          return () => ({
            ...pick(context.attrs, attrNames),
            ...withDefaultProps(context.attrs, globalProps, globalAttrNames)
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
          placeholder: context.attrs.placeholder,
          ...withDefaultProps(context.attrs, globalProps, ['name']),
          ...withDefaultProps(props, globalProps, ['label', 'size']),
          ...withDefaultProps(props.extends, globalProps, ['min', 'max', 'step', 'stepStrictly', 'precision', 'controls', 'controlsPosition'])
        })
      })
    }

    case 'select': {
      const globalAttrNames = ['name']
      const globalPropNames = ['size', 'multiple', 'clearable']
      const extendGlobalPropNames = ['autocomplete', 'name', 'id', 'automaticDropdown', 'filterable', 'allowCreate', 'remote', 'loadingText', 'noMatchText', 'noDataText', 'remoteMethod', 'filterMethod', 'defaultFirstOption', 'reserveKeyword', 'collapseTags', 'valueKey', 'multipleLimit', 'popperClass', 'popperAppendToBody']
      return useSelect(props, context, {
        handleProps: (_props, globalProps) => () => ({
          value: props.value,
          disabled: props.disabled,
          loading: props.loading,
          placeholder: context.attrs.placeholder,

          ...withDefaultProps(context.attrs, globalProps, globalAttrNames),
          ...withDefaultProps(props, globalProps, globalPropNames),
          ...withDefaultProps(props.extends, globalProps, extendGlobalPropNames)
        })
      })
    }

    case 'cascader': {
      return useCascader<T>(props, context, {
        handleProps(_props, globalProps) {
          const globalPropNames = ['options', 'size', 'clearable']
          const globalExtendsNames = ['props', 'popperClass', 'separator', 'filterable', 'filterMethod', 'beforeFilter', 'debounce', 'showAllLevels', 'collapseTags']

          return () => ({
            value: props.value,
            disabled: props.disabled,
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
          const globalPropNames = ['activeValue', 'inactiveValue', 'validateEvent']
          const globalAttrNames = ['name', 'id']
          const globalExtendsNames = ['width', 'activeIconClass', 'inactiveIconClass', 'activeText', 'inactiveText', 'activeColor', 'inactiveColor']
          return () => ({
            value: props.value,
            disabled: props.disabled,
  
            ...withDefaultProps(context.attrs, globalProps, globalAttrNames),
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

    case 'date-picker':
    case 'year':
    case 'month':
    case 'date':
    case 'dates':
    case 'months':
    case 'years':
    case 'week':
    case 'datetime':
    case 'datetimerange':
    case 'daterange':
    case 'monthrange': {
      return useDatePicker<T>(props, context, {
        type: 1,
        handleProps(_props, globalProps) {
          const type = props.type === 'date-picker' ? 'date' : props.type
          return () => ({
            type,
            value: props.value,
            disabled: props.disabled,
            readonly: props.readonly,
            timeArrowControl: props.extends.timeArrowControl,
            
            // global props
            ...withDefaultProps(context.attrs, globalProps, globalDateAttrNames),
            ...withDefaultProps(props, globalProps, globalDatePropNames),
            ...withDefaultProps(props.extends, globalProps, globalDateExtendNames)
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
            isRange: props.extends.isRange,
            arrowControl: props.extends.arrowControl,

            // global props
            ...withDefaultProps(context.attrs, globalProps, globalDateAttrNames),
            ...withDefaultProps(props, globalProps, globalDatePropNames),
            ...withDefaultProps(props.extends, globalProps, globalDateExtendNames)
          })
        }
      })
    }
    
    case 'time-select': {
      return useDatePicker<T>(props, context, {
        type: 3,
        handleProps(_props, globalProps) {
          return () => ({
            type: type,
            value: props.value,
            disabled: props.disabled,
            readonly: props.readonly,

            // global props
            ...withDefaultProps(context.attrs, globalProps, globalDateAttrNames),
            ...withDefaultProps(props, globalProps, globalDatePropNames),
            ...withDefaultProps(props.extends, globalProps, globalDateExtendNames)
          })
        }
      })
    }
    
    case 'file':
    case 'upload': {
      const globalPropNames = ['dragger', 'withCredentials', 'drag', 'beforeUpload', 'beforeRemove', 'limit', 'onRemove', 'onChange', 'onPreview', 'onSuccess', 'onProgress', 'onError', 'onExceed', 'action', 'headers', 'multiple', 'data', 'drag', 'listType', 'autoUpload', 'httpRequest']
      return useUpload<T>(props, context, {
        handleProps(_props, globalProps) {
          return () => ({
            type: 'select',
            fileList: props.fileList,
            disabled: props.disabled,

            // global props
            ...withDefaultProps(props.extends, globalProps, globalPropNames),
            name: context.attrs.name || globalProps?.name || empty,
            accept: props.accept || globalProps?.accept || empty,
          })
        }
      })
    }
  }
}