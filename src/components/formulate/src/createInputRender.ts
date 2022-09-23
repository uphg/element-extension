import { Ref } from "vue"
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
  _options: {
    formData: Ref<FormData>
    setRef?: SetRef
  }
) {
  const { formData, setRef } = _options
  const on = {
    input(value: string | number | boolean) {
      formData.value[props.key] = value
    }
  }

  const handleProps = (_props: any, globalProps: any, { propNames, globalPropNames }: { propNames: string[]; globalPropNames: string[] }) => {
    return () => ({
      value: formData.value[props.key],
      ...pick(props, propNames),
      ...withDefaultProps(props, globalProps, globalPropNames)
    })
  }

  const customOptions = { status: 1 as (0 | 1 | undefined), setRef, on, handleProps }

  switch (props.type) {
    case 'radio': {
      const { render } = useRadioGroup(props, empty, customOptions)
      return render
    }

    case 'checkbox': {
      const { render } = useCheckboxGroup(props, empty, customOptions)
      return render
    }

    case 'text':
    case 'textarea':
    case 'password': {
      const { render } = useInput(props, empty, {
        ...customOptions,
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
      const { render } = useInputNumber(props, empty, customOptions)
      return render
    }

    case 'select': {
      const { render } = useSelect(props, empty, customOptions)
      return render
    }
    
    case 'cascader': {
      const { render } = useCascader(props, empty, customOptions)
      return render
    }

    case 'switch': {
      const { render } = useSwitch(props, empty, customOptions)
      return render
    }

    case 'slider': {
      const { render } = useSlider(props, empty, customOptions)
      return render
    }

    case 'time':
    case 'time-picker': {
      const { render } = useDatePicker(props, empty, { type: 2, ...customOptions })
      return render
    }

    case 'time-select': {
      const { render } = useDatePicker(props, empty, { type: 3, ...customOptions })
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
      const { render } = useDatePicker(props, empty, { type: 1, ...customOptions })
      return render
    }

    case 'file':
    case 'upload': {
      const { render } = useUpload(props, empty, {
        setRef,
        on,
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