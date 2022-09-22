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
const uploadPropNames = ['name', 'dragger', 'type', 'fileList', 'disabled']

export function createInputRender(
  props: FormulateField,
  // context: SetupContext<{}> | undefined,
  _options: {
    formData: Ref<FormData>
    setRef?: SetRef
  }
) {
  const { formData, setRef } = _options
  switch (props.type) {
    case 'radio': {
      const { render } = useRadioGroup(props, empty, {
        handleProps(_props, globalProps, { propNames, globalPropNames }) {
          return () => ({
            ...pick(props, propNames),
            value: formData.value[props.key],
            ...withDefaultProps(props, globalProps, globalPropNames)
          })
        },
        setRef
      })
      return render
    }

    case 'checkbox': {
      const { render } = useCheckboxGroup(props, empty, {
        handleProps(_props, globalProps, { propNames, globalPropNames }) {
          return () => ({
            value: formData.value[props.key],
            ...pick(props, propNames),
            ...withDefaultProps(props, globalProps, globalPropNames)
          })
        },
        setRef
      })
      return render
    }

    case 'text':
    case 'textarea':
    case 'password': {
      const { render } = useInput(props, empty, {
        handleProps(_props, globalProps, { propNames, globalPropNames }) {
          return () => ({
            value: formData.value[props.key],
            ...pick(props, propNames),
            ...withDefaultProps(props, globalProps, globalPropNames)
          })
        },
        handleAttrs(_props, globalProps, { attrNames, globalAttrNames }) {
          return () => ({
            ...pick(props, attrNames),
            ...withDefaultProps(props, globalProps, globalAttrNames)
          })
        },
        setRef,
        status: 1
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
        type: 2,
        status: 1
      })

      return render
    }

    case 'time-select': {
      const { render } = useDatePicker(props, empty, {
        handleProps(_props, globalProps, { propNames, globalPropNames }) {
          return () => ({
            value: formData.value[props.key],
            ...pick(props, propNames),
            ...withDefaultProps(props, globalProps, globalPropNames)
          })
        },
        type: 3,
        status: 1
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
        handleProps(_props, globalProps, { propNames, globalPropNames }) {
          return () => ({
            value: formData.value[props.key],
            ...pick(props, propNames),
            ...withDefaultProps(props, globalProps, globalPropNames)
          })
        },
        type: 1,
        status: 1
      })

      return render
    }

    case 'file':
    case 'upload': {
      const { render } = useUpload(props, empty, {
        handleProps(_props, globalProps, { propNames, globalPropNames }) {
          return () => ({
            ...pick(props, propNames),
            ...withDefaultProps(props, globalProps, globalPropNames)
          })
        },
        setRef
      })

      return render
    }  
  }
}