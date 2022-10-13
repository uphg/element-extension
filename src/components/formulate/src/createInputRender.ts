import { h, Ref, VNodeChildren } from "vue"
import { Button } from "element-ui"
import { ButtonProps, FormulateField } from "./interface"
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
import { empty } from "../../../shared/commonProps"
import { ObjectLike, CustomInputValue } from '../../../../types/_common'
import { HandleRef } from "../../../composables/useComponentProps"
import { pick, withDefaultProps } from "../../../utils";
import { ComponentProps, ComponentGlobalProps } from "../../../../types/_common"

type HandleProps = (
  props: ComponentProps | FormulateField | ObjectLike | undefined,
  globalProps: ComponentGlobalProps | ObjectLike | undefined,
  options: { propNames: string[]; globalPropNames: string[] }
) => () => ObjectLike

export function createInputRender(
  props: FormulateField,
  _options: {
    formData: Ref<{ [key: string]: CustomInputValue }>
    handleRef?: HandleRef
  }
) {
  const { formData, handleRef } = _options
  const on = {
    input(value: string | number | boolean) {
      formData.value[props.key] = value
    }
  }

  const handleProps: HandleProps = (_props, globalProps, { propNames, globalPropNames }) => {
    return () => ({
      value: formData.value[props.key],
      ...pick(props, propNames),
      ...withDefaultProps(props, globalProps, globalPropNames)
    })
  }

  const customOptions = {
    status: 1 as (0 | 1 | undefined),
    handleRef,
    on,
    handleProps
  }

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
      const { button, renderChildren, tips } = props || {}
      const renderButton = useButton(button)
      const renderTips = useTips(props)
      const context = {
        slots: {
          default: renderChildren ? renderChildren : (button && (() => [renderButton()])),
          tip: tips && (() => [renderTips()])
        }
      }
      const { render } = useUpload(props, context, {
        on,
        handleRef,
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

function useTips<T extends { tipClass?: string; tipItemClass?: string; tips: string[]; }>(props: T) {
  return () => h('div', {
      class: props.tipClass || 'el-upload__tip',
      slot: 'tip',
    }, props.tips.map((item: string) => h('div', {
      class: props.tipItemClass || 'el-upload__tip-item',
    }, [item]))
  )
}

function useButton(props: ButtonProps, _children?: VNodeChildren | string) {
  const children = _children || props.text && [props.text] 
  return () => h(Button, {
    props: {
      type: props.hue,
      size: props.size,
      plain: props.plain,
      round: props.round,
      circle: props.circle,
      autofocus: props.autofocus,
      icon: props.icon
    }
  },  children)
}