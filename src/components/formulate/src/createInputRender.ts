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
import pick from "../../../utils/pick";

export function createInputRender(
  props: FormulateField,
  // context: SetupContext<{}> | undefined,
  _options: {
    formData: Ref<FormData>
    setRef?: SetRef
  }
) {
  const { formData, setRef } = _options
  const input = (value: string | number | boolean) => {
    formData.value[props.key] = value
  }
  switch (props.type) {
    case 'radio': {
      const { render } = useRadioGroup(props, empty, {
        status: 1,
        setRef,
        on: { input },
        handleProps(_props, globalProps, { propNames, globalPropNames }) {
          return () => ({
            value: formData.value[props.key],
            ...pick(props, propNames),
            ...withDefaultProps(props, globalProps, globalPropNames)
          })
        }
      })
      return render
    }

    case 'checkbox': {
      const { render } = useCheckboxGroup(props, empty, {
        status: 1,
        setRef,
        on: { input },
        handleProps(_props, globalProps, { propNames, globalPropNames }) {
          return () => ({
            value: formData.value[props.key],
            ...pick(props, propNames),
            ...withDefaultProps(props, globalProps, globalPropNames)
          })
        }
      })
      return render
    }

    case 'text':
    case 'textarea':
    case 'password': {
      const { render } = useInput(props, empty, {
        status: 1,
        setRef,
        on: { input },
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
        }
      })
      return render
    }
    
    case 'number':
    case 'input-number': {
      const { render } = useInputNumber(props, empty, {
        status: 1,
        setRef,
        on: { input },
        handleProps(_props, globalProps, { propNames, globalPropNames }) {
          return () => ({
            value: formData.value[props.key],
            ...pick(props, propNames),
            ...withDefaultProps(props, globalProps, globalPropNames)
          })
        }
      })
      return render
    }

    case 'select': {
      const { render } = useSelect(props, empty, {
        status: 1,
        setRef,
        on: { input },
        handleProps(_props, globalProps, { propNames, globalPropNames }) {
          return () => ({
            value: formData.value[props.key],
            ...pick(props, propNames),
            ...withDefaultProps(props, globalProps, globalPropNames)
          })
        }
      })
      return render
    }
    
    case 'cascader': {
      const { render } = useCascader(props, empty, {
        status: 1,
        setRef,
        on: { input },
        handleProps(_props, globalProps, { propNames, globalPropNames }) {
          return () => ({
            value: formData.value[props.key],
            ...pick(props, propNames),
            ...withDefaultProps(props, globalProps, globalPropNames)
          })
        }
      })
      return render
    }

    case 'switch': {
      const { render } = useSwitch(props, empty, {
        status: 1,
        setRef,
        on: { input },
        handleProps(_props, globalProps, { globalPropNames }) {
          return () => ({
            value: formData.value[props.key],
            disabled: props.disabled,
            name: props.name,
            ...withDefaultProps(props, globalProps, globalPropNames)
          })
        }
      })
      return render
    }

    case 'slider': {
      const { render } = useSlider(props, empty, {
        status: 1,
        setRef,
        on: { input },
        handleProps(_props, globalProps, { globalPropNames }) {
          return () => ({
            value: props.value,
            disabled: props.disabled,
            ...withDefaultProps(props, globalProps, globalPropNames)
          })
        }
      })
      return render
    }

    case 'time':
    case 'time-picker': {
      const { render } = useDatePicker(props, empty, {
        type: 2,
        status: 1,
        setRef,
        on: { input },
        handleProps(_props, globalProps, { propNames, globalPropNames }) {
          return () => ({
            value: formData.value[props.key],
            ...pick(props, propNames),
            ...withDefaultProps(props, globalProps, globalPropNames)
          })
        }
      })
      return render
    }

    case 'time-select': {
      const { render } = useDatePicker(props, empty, {
        type: 3,
        status: 1,
        setRef,
        on: { input },
        handleProps(_props, globalProps, { propNames, globalPropNames }) {
          return () => ({
            value: formData.value[props.key],
            ...pick(props, propNames),
            ...withDefaultProps(props, globalProps, globalPropNames)
          })
        }
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
        type: 1,
        status: 1,
        setRef,
        on: { input },
        handleProps(_props, globalProps, { propNames, globalPropNames }) {
          return () => ({
            value: formData.value[props.key],
            ...pick(props, propNames),
            ...withDefaultProps(props, globalProps, globalPropNames)
          })
        }
      })
      return render
    }

    case 'file':
    case 'upload': {
      const { render } = useUpload(props, empty, {
        setRef,
        on: { input },
        handleProps(_props, globalProps, { propNames, globalPropNames }) {
          return () => ({
            ...pick(props, propNames),
            ...withDefaultProps(props, globalProps, globalPropNames)
          })
        }
      })
      return render
    }  
  }
}