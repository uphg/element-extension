import { Ref, SetupContext } from "vue"
import { FormulateField } from "./formulateProps"
import { FormData } from '../../../types/form'
import { useRadioGroup } from "../../radio-group"
import { useCheckboxGroup } from "../../checkbox-group"
import { useInput } from "../../input"
import { useInputNumber } from "../../input-number"
import { useSelect } from "../../select"
import { useCascader } from "../../cascader"
import { useSwitch } from "../../switch"
import { useSlider } from "../../slider"
import { useDatePicker } from "../../date-picker"
import { useUpload } from "../../upload"

import { empty } from "../../../shared/_commonProps"
import { SetRef } from "../../../composables/useComponentProps"

import { withDefaultProps } from "../../../utils/withDefaultProps"
import { globalCascaderPropNames, globalCheckboxGroupPropNames, globalDatePropNames, globalInputNumberPropNames, globalInputPropNames, globalRadioGroupPropNames, globalSelectPropNames, globalSliderPropNames, globalSwitchPropNames, globalUploadPropNames } from "../../../shared/configPropertyMap"
import pick from "../../../utils/pick";

const datePropNames = ['readonly', 'name', 'id', 'disabled', 'isRange', 'arrowControl', 'timeArrowControl']

export function createInputRender(
  props: FormulateField,
  context: SetupContext<{}> | undefined,
  _options: {
    formData: Ref<FormData>
    setRef?: SetRef
  }
) {
  const { formData, setRef } = _options
  switch (props.type) {
    case 'radio': {
      const { render } = useRadioGroup(props, empty, {
        handleProps(_props, globalProps) {
          return () => ({
            value: formData.value[props.key],
            disabled: props.disabled,
            options: props.options,
            ...withDefaultProps(props, globalProps, globalRadioGroupPropNames)
          })
        },
        setRef
      })
      return render
    }

    case 'checkbox': {
      const { render } = useCheckboxGroup(props, empty, {
        handleProps(_props, globalProps) {
          return () => ({
            value: formData.value[props.key],
            disabled: props.disabled,
            options: props.options,
            ...withDefaultProps(props, globalProps, globalCheckboxGroupPropNames)
          })
        },
        setRef
      })
      return render
    }

    case 'text':
    case 'textarea':
    case 'password': {
      const propNames = ['resize', 'form', 'disabled', 'readonly', 'type', 'autocomplete', 'validateEvent', 'label', 'showPassword', 'tabindex']
      const attrNames = ['placeholder', 'name', 'step', 'autofocus', 'rows', 'minlength', 'max', 'min']
      const globalAttrNames = ['maxlength']

      const { render } = useInput(props, empty, {
        handleProps(_props, globalProps) {
          return () => ({
            value: formData.value[props.key],
            ...pick(props, propNames),
            ...withDefaultProps(props, globalProps, globalInputPropNames)
          })
        },
        handleAttrs(_props, globalProps) {
          return () => ({
            ...pick(props, attrNames),
            ...withDefaultProps(props, globalProps, globalAttrNames)
          })
        },
        setRef
      })
      return render
    }
    
    case 'number':
    case 'input-number': {
      const propNames = ['name', 'disabled', 'label', 'placeholder']
      const { render } = useInputNumber(props, empty, {
        handleProps(_props, globalProps) {
          return () => ({
            value: formData.value[props.key],
            ...pick(props, propNames),
            ...withDefaultProps(props, globalProps, globalInputNumberPropNames)
          })
        },
        setRef
      })
      return render
    }

    case 'select': {
      const propNames = ['name', 'id', 'disabled', 'autocomplete', 'automaticDropdown',  'filterable', 'allowCreate', 'loading', 'remote', 'loadingText', 'noMatchText', 'noDataText', 'remoteMethod', 'filterMethod', 'placeholder', 'defaultFirstOption', 'reserveKeyword', 'collapseTags']
      const { render } = useSelect(props, empty, {
        handleProps(_props, globalProps) {
          return () => ({
            value: formData.value[props.key],
            ...pick(props, propNames),
            ...withDefaultProps(props, globalProps, globalSelectPropNames)
          })
        },
      })
      return render
    }
    
    case 'cascader': {
      const propNames = ['placeholder', 'disabled', 'filterable', 'filterMethod', 'debounce', 'beforeFilter']
      const { render } = useCascader(props, empty, {
        handleProps(_props, globalProps) {
          return () => ({
            value: formData.value[props.key],
            ...pick(props, propNames),
            ...withDefaultProps(props, globalProps, globalCascaderPropNames)
          })
        }
      })
      return render
    }

    case 'switch': {
      const { render } = useSwitch(props, empty, {
        handleProps(_props, globalProps) {
          return () => ({
            value: formData.value[props.key],
            disabled: props.disabled,
            name: props.name,
            ...withDefaultProps(props, globalProps, globalSwitchPropNames)
          })
        }
      })
      return render
    }

    case 'slider': {
      const { render } = useSlider(props, empty, {
        handleProps(_props, globalProps) {
          return () => ({
            value: props.value,
            disabled: props.disabled,
            ...withDefaultProps(props, globalProps, globalSliderPropNames)
          })
        },
        setRef
      })
      return render
    }

    case 'time':
    case 'time-picker': {
      const { render } = useDatePicker(props, empty, {
        handleProps(_props, globalProps) {
          return () => ({
            value: formData.value[props.key],
            ...pick(props, datePropNames),
            ...withDefaultProps(props, globalProps, globalDatePropNames)
          })
        },
        type: 2
      })

      return render
    }

    case 'time-select': {
      const { render } = useDatePicker(props, empty, {
        handleProps(_props, globalProps) {
          return () => ({
            value: formData.value[props.key],
            type: props.type,
            ...pick(props, datePropNames),
            ...withDefaultProps(props, globalProps, globalDatePropNames)
          })
        },
        type: 3
      })

      return render
    }

    case 'date':
    case 'year':
    case 'month':
    case 'dates':
    case 'week':
    case 'daterange':
    case 'monthrange':
    case 'datetime':
    case 'datetimerange':
    case 'date-picker': {
      const { render } = useDatePicker(props, empty, {
        handleProps(_props, globalProps) {
          return () => ({
            value: formData.value[props.key],
            type: props.type,
            timeArrowControl: props.timeArrowControl,
            ...pick(props, datePropNames),
            ...withDefaultProps(props, globalProps, globalDatePropNames)
          })
        },
        type: 1
      })

      return render
    }

    case 'file':
    case 'upload': {
      const propNames = ['name', 'dragger', 'type', 'fileList', 'disabled']
      const { render } = useUpload(props, empty, {
        handleProps(_props, globalProps) {
          return () => ({
            ...pick(props, propNames),
            ...withDefaultProps(props, globalProps, globalUploadPropNames)
          })
        },
        setRef
      })

      return render
    }  
  }
}